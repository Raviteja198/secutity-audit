import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/api/authz";
import { forTenant } from "@/lib/tenantPrisma";
import { jsonError, jsonOk } from "@/lib/api/http";
import { uploadTenantLogo } from "@/services/cloudinary";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const tenant = await db.tenant.findUnique({
      where: { id: ctx.tenantId },
      select: { id: true, name: true, logoUrl: true },
    });
    return jsonOk({ tenant });
  } catch (e) {
    return jsonError(e);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);

    const body = await req.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    if (!name) {
      return jsonError(Object.assign(new Error("Organization name is required."), { status: 422 }));
    }
    if (name.length > 100) {
      return jsonError(Object.assign(new Error("Organization name must be 100 characters or fewer."), { status: 422 }));
    }

    const tenant = await db.tenant.update({
      where: { id: ctx.tenantId },
      data: { name },
      select: { id: true, name: true, logoUrl: true },
    });

    return jsonOk({ tenant });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);

    const formData = await req.formData();
    const file = formData.get("logo");
    if (!(file instanceof File) || file.size === 0) {
      return jsonError(Object.assign(new Error("A logo image file is required."), { status: 422 }));
    }

    const logoUrl = await uploadTenantLogo(file, ctx.tenantId);

    const tenant = await db.tenant.update({
      where: { id: ctx.tenantId },
      data: { logoUrl },
      select: { id: true, name: true, logoUrl: true },
    });

    return jsonOk({ tenant });
  } catch (e) {
    return jsonError(e);
  }
}
