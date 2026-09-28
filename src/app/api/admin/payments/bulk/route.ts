import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { invalidateDashboardCache } from "@/lib/dashboardCache";

type RowResult = {
  memberId: string;
  fullName: string;
  memberUid: string;
  success: boolean;
  error?: string;
};

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    const db = forTenant(admin.tenantId);

    // Verify session user exists in this DB
    const sessionUser = await db.user.findUnique({
      where: { id: admin.userId },
      select: { id: true },
    });
    if (!sessionUser) {
      return jsonError(
        Object.assign(
          new Error("Session user not found. Please sign out and sign in again."),
          { status: 401 },
        ),
      );
    }

    const body = await req.json();
    const { memberIds, month, year, baseAmount, penaltyAmount = 0 } = body as {
      memberIds: string[];
      month: number;
      year: number;
      baseAmount: number;
      penaltyAmount?: number;
    };

    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return jsonError("No members selected.");
    }
    if (!month || !year || !baseAmount || baseAmount <= 0) {
      return jsonError("Missing or invalid payment details.");
    }

    // Fetch member details for all selected members
    const members = await db.member.findMany({
      where: { id: { in: memberIds } },
      select: { id: true, fullName: true, memberUid: true },
    });

    const memberMap = new Map(members.map((m) => [m.id, m]));

    // Find already-existing payments for this period (to skip duplicates)
    const existing = await db.payment.findMany({
      where: {
        memberId: { in: memberIds },
        month,
        year,
      },
      select: { memberId: true },
    });
    const existingSet = new Set(existing.map((p) => p.memberId));

    const results: RowResult[] = [];
    let created = 0;
    let skipped = 0;
    let failed = 0;

    for (const memberId of memberIds) {
      const member = memberMap.get(memberId);
      if (!member) {
        results.push({ memberId, fullName: "Unknown", memberUid: "?", success: false, error: "Member not found." });
        failed++;
        continue;
      }

      if (existingSet.has(memberId)) {
        const mn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month - 1] ?? month;
        results.push({
          memberId,
          fullName: member.fullName,
          memberUid: member.memberUid,
          success: false,
          error: `Payment already exists for ${mn} ${year}.`,
        });
        skipped++;
        continue;
      }

      try {
        await db.payment.create({
          data: {
            tenantId: admin.tenantId,
            month,
            year,
            baseAmountPaise: Math.round(baseAmount * 100),
            penaltyAmountPaise: Math.round(penaltyAmount * 100),
            totalAmountPaise: Math.round((baseAmount + penaltyAmount) * 100),
            status: "PENDING",
            memberId,
            recordedById: admin.userId,
          },
        });
        results.push({ memberId, fullName: member.fullName, memberUid: member.memberUid, success: true });
        created++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unexpected error";
        results.push({ memberId, fullName: member.fullName, memberUid: member.memberUid, success: false, error: msg });
        failed++;
      }
    }

    if (created > 0) {
      await invalidateDashboardCache();
    }

    return jsonOk({ results, created, skipped, failed });
  } catch (e) {
    return jsonError(e);
  }
}
