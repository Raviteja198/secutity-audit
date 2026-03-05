import { z } from "zod";

export const memberCreateSchema = z.object({
  memberUid: z.string().min(3).max(32),
  fullName: z.string().min(2).max(200),
  phone: z.string().min(6).max(32).optional(),
  email: z.string().email().optional(),
  address: z.string().max(500).optional(),
  joinDate: z.coerce.date(),
});

export const memberUpdateSchema = memberCreateSchema.partial().extend({
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  exitDate: z.coerce.date().nullable().optional(),
});

