type HeaderBag = Headers | Record<string, string | string[] | undefined>;

type LoginAttempt = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, LoginAttempt>();
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

function readHeader(headers: HeaderBag | undefined, name: string) {
  if (!headers) return undefined;

  if ("get" in headers && typeof headers.get === "function") {
    return headers.get(name) ?? undefined;
  }

  const recordHeaders = headers as Record<string, string | string[] | undefined>;
  const value = recordHeaders[name] ?? recordHeaders[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

/**
 * A proxy may send multiple addresses; the first one is the originating client.
 * Production deployments must configure their proxy so this header cannot be
 * supplied directly by an untrusted client.
 */
export function getClientIp(headers: HeaderBag | undefined) {
  const forwarded = readHeader(headers, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return readHeader(headers, "x-real-ip") ?? "unknown";
}

export function loginRateLimitKey(ip: string, email: string) {
  return `${ip}:${email.toLowerCase()}`;
}

/**
 * Local fallback limiter for credential sign-in. A multi-instance production
 * deployment should put the same policy at the edge or in a shared store.
 */
export function consumeLoginAttempt(key: string, now = Date.now()) {
  const existing = loginAttempts.get(key);

  if (!existing || existing.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_LOGIN_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  loginAttempts.set(key, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function clearLoginAttempts(key: string) {
  loginAttempts.delete(key);
}
