import { z } from "zod";

export const contributionRuleCreateSchema = z.object({
  amountPaise: z.number().int().positive(),
  effectiveFromMonth: z.number().int().min(1).max(12),
  effectiveFromYear: z.number().int().min(2000).max(3000),
});

export const penaltyRuleCreateSchema = z.object({
  amountPaise: z.number().int().nonnegative(),
  effectiveFrom: z.coerce.date(),
});

