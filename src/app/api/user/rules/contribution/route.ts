import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    await requireAuth(req);
    const items = await prisma.contributionRule.findMany({
      orderBy: [{ effectiveFromYear: "desc" }, { effectiveFromMonth: "desc" }],
    });
    return jsonOk({ items });
  } catch (e) {
    return jsonError(e);
  }
}

