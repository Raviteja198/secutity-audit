import { isTestModeEnabled, sendEmail } from "@/services/email";
import { sendWhatsAppMessage } from "@/services/whatsapp";
import { formatPhoneNumber } from "@/utils/phone";

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getPenaltyLabel() {
  return process.env.PAYMENT_REMINDER_PENALTY_TEXT?.trim() || "late fee penalties";
}

type NotificationUser = {
  name: string;
  email?: string | null;
  phone?: string | null;
  phoneNumber?: string | null;
};

type NotificationPayment = {
  amount: number;
  dueDate: string;
};

type NotificationEmail = {
  subject: string;
  text: string;
  html: string;
};

type NotificationChannels = {
  email?: boolean;
  whatsapp?: boolean;
};

type SendNotificationInput = {
  user: NotificationUser;
  payment: NotificationPayment;
  email?: NotificationEmail;
  templateName?: string | null;
  /** Which channels to actually attempt. Defaults: email on, WhatsApp off. */
  channels?: NotificationChannels;
};

export async function sendNotification({ user, payment, email, templateName, channels }: SendNotificationInput) {
  const wantsEmail = channels?.email ?? true;
  const wantsWhatsapp = channels?.whatsapp ?? false;

  if (wantsEmail && email?.subject && user.email) {
    await sendEmail({
      to: user.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  }

  if (!wantsWhatsapp) return;

  const to = formatPhoneNumber(user.phoneNumber ?? user.phone);
  if (!to) {
    console.warn("Skipping WhatsApp notification due to missing or invalid phone number", {
      userName: user.name,
      rawPhone: user.phoneNumber ?? user.phone ?? null,
    });
    return;
  }

  if (isTestModeEnabled()) {
    console.log("[TEST MODE] Skipping WhatsApp send (no test-phone redirect configured)", {
      userName: user.name,
      wouldHaveSentTo: to,
    });
    return;
  }

  const resolvedTemplateName = templateName?.trim() || process.env.WHATSAPP_DEFAULT_TEMPLATE?.trim() || "payment_reminder";

  try {
    await sendWhatsAppMessage({
      to,
      templateName: resolvedTemplateName,
      parameters: [user.name, formatAmount(payment.amount), payment.dueDate, getPenaltyLabel()],
    });
  } catch (error) {
    console.error("Failed to send WhatsApp notification", {
      userName: user.name,
      to,
      error,
    });
  }
}
