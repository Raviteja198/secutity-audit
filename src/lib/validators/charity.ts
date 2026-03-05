import { z } from "zod";

export const charityCreateSchema = z.object({
  title: z.string().min(2).max(200),
  beneficiary: z.string().min(2).max(200),
  purpose: z.string().max(500).optional(),
  amountPaise: z.number().int().positive(),
  date: z.coerce.date(),
  notes: z.string().max(2000).optional(),
  imageUrl: z.string().url().optional(),
});

export const charityUpdateSchema = charityCreateSchema.partial();

