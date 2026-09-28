export type FieldErrors = Record<string, string>;

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function isValidUrl(v: string): boolean {
  try {
    const u = new URL(v.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function hasErrors(errs: FieldErrors): boolean {
  return Object.values(errs).some(Boolean);
}
