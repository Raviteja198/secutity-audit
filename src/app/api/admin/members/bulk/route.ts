import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError } from "@/lib/api/http";

type BulkRow = {
  fullName: string;
  phone?: string;
  email?: string;
  joinDate: string;
  memberUid?: string;
  address?: string;
};

type RowResult = {
  row: number;
  fullName: string;
  success: boolean;
  memberUid?: string;
  error?: string;
};

/**
 * POST /api/admin/members/bulk
 * Accepts an array of members and creates them all.
 * Returns per-row success/failure without short-circuiting.
 */
export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);

    const body = await req.json();
    const rows: BulkRow[] = body?.members;

    if (!Array.isArray(rows) || rows.length === 0) {
      return jsonError("No member rows provided.");
    }
    if (rows.length > 500) {
      return jsonError("Maximum 500 members per import.");
    }

    // Get last existing UID number to auto-generate UIDs
    const lastMember = await db.member.findFirst({
      orderBy: { memberUid: "desc" },
      select: { memberUid: true },
    });

    let uidCounter = 1;
    if (lastMember?.memberUid) {
      const match = lastMember.memberUid.match(/(\d+)$/);
      if (match) uidCounter = parseInt(match[1], 10) + 1;
    }

    const results: RowResult[] = [];
    let created = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 1;

      // Basic validation
      const fullName = row.fullName?.trim();
      if (!fullName || fullName.length < 2) {
        results.push({ row: rowNum, fullName: row.fullName ?? "", success: false, error: "Full name is required (min 2 chars)." });
        continue;
      }

      let joinDate: Date;
      try {
        // Accept: YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
        const raw = row.joinDate?.trim() ?? "";
        if (!raw) throw new Error("missing");

        // Try ISO first
        if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
          joinDate = new Date(raw);
        } else if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}/.test(raw)) {
          // DD/MM/YYYY or DD-MM-YYYY
          const [d, m, y] = raw.split(/[\/\-]/);
          joinDate = new Date(`${y}-${m}-${d}`);
        } else {
          joinDate = new Date(raw);
        }
        if (isNaN(joinDate.getTime())) throw new Error("invalid date");
      } catch {
        results.push({ row: rowNum, fullName, success: false, error: `Invalid join date: "${row.joinDate}". Use YYYY-MM-DD or DD/MM/YYYY.` });
        continue;
      }

      // Auto-generate UID if not provided
      const memberUid = row.memberUid?.trim() || `M-${String(uidCounter).padStart(4, "0")}`;

      try {
        await db.member.create({
          data: {
            tenantId: ctx.tenantId,
            memberUid,
            fullName,
            phone: row.phone?.trim() || null,
            email: row.email?.trim() || null,
            address: row.address?.trim() || null,
            joinDate,
            status: "ACTIVE",
          },
        });
        uidCounter++;
        created++;
        results.push({ row: rowNum, fullName, success: true, memberUid });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        const isDuplicate = msg.includes("Unique constraint") || msg.includes("unique");
        results.push({
          row: rowNum,
          fullName,
          success: false,
          error: isDuplicate
            ? `Member UID "${memberUid}" already exists. Provide a unique UID or leave blank for auto-generation.`
            : "Database error: " + msg.slice(0, 120),
        });
      }
    }

    return jsonCreated({
      created,
      failed: results.filter((r) => !r.success).length,
      results,
    });
  } catch (e) {
    return jsonError(e);
  }
}
