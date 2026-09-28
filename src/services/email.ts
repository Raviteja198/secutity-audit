import net from "node:net";
import tls from "node:tls";
import { Buffer } from "node:buffer";

type EmailAttachment = {
  filename: string;
  content: Uint8Array | Buffer;
  contentType?: string;
};

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: EmailAttachment[];
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

type SocketLike = net.Socket | tls.TLSSocket;

const DEFAULT_HOST = process.env.EMAIL_HOST?.trim() || "smtp.gmail.com";
const DEFAULT_PORT = Number(process.env.EMAIL_PORT ?? "587");
const DEFAULT_SECURE = (process.env.EMAIL_SECURE ?? "false").toLowerCase() === "true";
const CRLF = "\r\n";

function getSmtpConfig(): SmtpConfig {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  if (!user || !pass) {
    throw Object.assign(
      new Error("Email is not configured. Set EMAIL_USER and EMAIL_PASS before sending mail."),
      { status: 500 }
    );
  }

  return {
    host: DEFAULT_HOST,
    port: Number.isFinite(DEFAULT_PORT) ? DEFAULT_PORT : 587,
    secure: DEFAULT_SECURE,
    user,
    pass,
    from: process.env.EMAIL_FROM?.trim() || `"Youth Group" <${user}>`,
  };
}

function escapeSmtpText(input: string) {
  return input
    .replace(/\r?\n/g, CRLF)
    .split(CRLF)
    .map((line) => (line.startsWith(".") ? `.${line}` : line))
    .join(CRLF);
}

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function renderEmail({ config, input }: { config: SmtpConfig; input: SendEmailInput }) {
  const mixedBoundary = `mixed_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const altBoundary = `alt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const lines: string[] = [
    `From: ${config.from}`,
    `To: ${input.to}`,
    `Subject: ${encodeHeader(input.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary=\"${mixedBoundary}\"`,
    "",
    `--${mixedBoundary}`,
    `Content-Type: multipart/alternative; boundary=\"${altBoundary}\"`,
    "",
    `--${altBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    escapeSmtpText(input.text),
  ];

  if (input.html) {
    lines.push(
      `--${altBoundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
      escapeSmtpText(input.html)
    );
  }

  lines.push(`--${altBoundary}--`);

  for (const attachment of input.attachments ?? []) {
    const attachmentContent = Buffer.from(attachment.content).toString("base64");
    lines.push(
      "",
      `--${mixedBoundary}`,
      `Content-Type: ${attachment.contentType ?? "application/octet-stream"}; name=\"${attachment.filename}\"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename=\"${attachment.filename}\"`,
      "",
      attachmentContent.replace(/(.{76})/g, "$1" + CRLF)
    );
  }

  lines.push(`--${mixedBoundary}--`, "");
  return lines.join(CRLF);
}

function waitForCode(socket: SocketLike, expectedFirstDigit?: number) {
  return new Promise<string>((resolve, reject) => {
    let buffer = "";

    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1];
      if (!last || !/^\d{3}[\s-]/.test(last)) return;
      if (last[3] === "-") return;

      cleanup();
      const code = Number(last.slice(0, 3));
      if (expectedFirstDigit && Math.floor(code / 100) !== expectedFirstDigit) {
        reject(new Error(`SMTP error ${code}: ${last}`));
        return;
      }
      resolve(buffer);
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onClose = () => {
      cleanup();
      reject(new Error("SMTP connection closed unexpectedly"));
    };

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    };

    socket.on("data", onData);
    socket.once("error", onError);
    socket.once("close", onClose);
  });
}

async function sendCommand(socket: SocketLike, command: string, expectedFirstDigit = 2) {
  socket.write(`${command}${CRLF}`);
  return waitForCode(socket, expectedFirstDigit);
}

async function upgradeToTls(socket: net.Socket, host: string) {
  return new Promise<tls.TLSSocket>((resolve, reject) => {
    const secureSocket = tls.connect({ socket, servername: host }, () => resolve(secureSocket));
    secureSocket.once("error", reject);
  });
}

export function isTestModeEnabled() {
  return (process.env.TEST_MODE ?? "").trim().toLowerCase() === "true";
}

/**
 * In TEST_MODE, every outgoing email is redirected to TEST_MODE_EMAIL (one or more
 * comma-separated addresses) instead of its real recipient — the original recipient
 * is kept visible in the subject line so it's still clear who it *would* have gone
 * to. This is the single choke point every email in the app goes through (receipts,
 * OTPs, payment reminders, etc.), so enabling TEST_MODE protects all of them at once.
 */
function applyTestModeRedirect(input: SendEmailInput): SendEmailInput {
  if (!isTestModeEnabled()) return input;

  const testRecipients = (process.env.TEST_MODE_EMAIL ?? "")
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (testRecipients.length === 0) {
    throw Object.assign(
      new Error("TEST_MODE is enabled but TEST_MODE_EMAIL is not set — refusing to send to avoid leaking a real email."),
      { status: 500 }
    );
  }

  return {
    ...input,
    to: testRecipients.join(", "),
    subject: `[TEST MODE — was: ${input.to}] ${input.subject}`,
  };
}

export async function sendEmail(rawInput: SendEmailInput) {
  const input = applyTestModeRedirect(rawInput);
  const recipients = input.to.split(",").map((addr) => addr.trim()).filter(Boolean);
  const config = getSmtpConfig();

  const plainSocket = config.secure
    ? null
    : net.createConnection({ host: config.host, port: config.port });

  let socket: SocketLike = config.secure
    ? tls.connect({ host: config.host, port: config.port, servername: config.host })
    : plainSocket!;

  await waitForCode(socket, 2);
  await sendCommand(socket, `EHLO ${process.env.EMAIL_HELO_HOST?.trim() || "localhost"}`);

  if (!config.secure) {
    await sendCommand(socket, "STARTTLS");
    socket = await upgradeToTls(plainSocket!, config.host);
    await sendCommand(socket, `EHLO ${process.env.EMAIL_HELO_HOST?.trim() || "localhost"}`);
  }

  await sendCommand(socket, "AUTH LOGIN", 3);
  await sendCommand(socket, Buffer.from(config.user).toString("base64"), 3);
  await sendCommand(socket, Buffer.from(config.pass).toString("base64"), 2);
  await sendCommand(socket, `MAIL FROM:<${config.user}>`);
  for (const recipient of recipients) {
    await sendCommand(socket, `RCPT TO:<${recipient}>`);
  }
  await sendCommand(socket, "DATA", 3);
  socket.write(`${renderEmail({ config, input })}${CRLF}.${CRLF}`);
  await waitForCode(socket, 2);
  await sendCommand(socket, "QUIT", 2);
}
