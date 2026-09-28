import type { TenantPrismaClient } from "@/lib/tenantPrisma";

/** Tokens an admin can drop into subject/body; substituted per-member when sending. */
export const REMINDER_TEMPLATE_PLACEHOLDERS = [
  { token: "{{fullName}}", label: "Member name", example: "Jane Doe" },
  { token: "{{totalDue}}", label: "Total amount due", example: "Rs. 1,500.00" },
  { token: "{{itemsList}}", label: "Pending periods list", example: "• July 2026 — Rs. 500.00\n• August 2026 — Rs. 1,000.00" },
] as const;

const DEFAULT_TEMPLATE_SEED = {
  name: "Default",
  subject: "Payment reminder",
  body: [
    "Hello {{fullName}},",
    "",
    "This is a reminder for your pending payment(s):",
    "{{itemsList}}",
    "",
    "Total due: {{totalDue}}",
    "Please complete the payment at the earliest.",
  ].join("\n"),
};

/** Replaces every {{token}} occurrence with its value; unknown tokens are left as-is. */
export function renderReminderTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match
  );
}

/** Turns the plain-text body into a simple HTML email body — escape, then newlines to <br>. */
export function deriveHtmlFromBody(body: string): string {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<p>${escaped.replace(/\n/g, "<br>")}</p>`;
}

export async function listReminderTemplates(db: TenantPrismaClient) {
  return db.reminderTemplate.findMany({ orderBy: [{ isDefault: "desc" }, { name: "asc" }] });
}

export async function getReminderTemplate(db: TenantPrismaClient, id: string) {
  return db.reminderTemplate.findUnique({ where: { id } });
}

/** Returns the isDefault=true template, creating the seed default if the table is empty. */
export async function getDefaultReminderTemplate(db: TenantPrismaClient, tenantId: string) {
  const existing = await db.reminderTemplate.findFirst({ where: { isDefault: true } });
  if (existing) return existing;

  const any = await db.reminderTemplate.findFirst({ orderBy: { createdAt: "asc" } });
  if (any) {
    return db.reminderTemplate.update({ where: { id: any.id }, data: { isDefault: true } });
  }

  return db.reminderTemplate.create({ data: { ...DEFAULT_TEMPLATE_SEED, tenantId, isDefault: true } });
}

/** Resolves the template to use for a send: explicit id if given (and valid), else the default. */
export async function resolveReminderTemplate(db: TenantPrismaClient, tenantId: string, templateId?: string | null) {
  if (templateId) {
    const found = await getReminderTemplate(db, templateId);
    if (found) return found;
    console.warn(`[reminders] templateId "${templateId}" not found, falling back to default template.`);
  }
  return getDefaultReminderTemplate(db, tenantId);
}

export async function createReminderTemplate(db: TenantPrismaClient, tenantId: string, input: { name: string; subject: string; body: string }) {
  return db.reminderTemplate.create({ data: { ...input, tenantId } });
}

export async function updateReminderTemplate(db: TenantPrismaClient, id: string, input: { name: string; subject: string; body: string }) {
  return db.reminderTemplate.update({ where: { id }, data: input });
}

export async function deleteReminderTemplate(db: TenantPrismaClient, id: string) {
  const count = await db.reminderTemplate.count();
  if (count <= 1) {
    throw Object.assign(new Error("Can't delete the only remaining template."), { status: 400 });
  }
  const template = await getReminderTemplate(db, id);
  await db.reminderTemplate.delete({ where: { id } });

  // If the default template was deleted, promote another one so a default always exists.
  if (template?.isDefault) {
    const next = await db.reminderTemplate.findFirst({ orderBy: { createdAt: "asc" } });
    if (next) await db.reminderTemplate.update({ where: { id: next.id }, data: { isDefault: true } });
  }
}

export async function setDefaultReminderTemplate(db: TenantPrismaClient, id: string) {
  await db.$transaction([
    db.reminderTemplate.updateMany({ where: { isDefault: true }, data: { isDefault: false } }),
    db.reminderTemplate.update({ where: { id }, data: { isDefault: true } }),
  ]);
}
