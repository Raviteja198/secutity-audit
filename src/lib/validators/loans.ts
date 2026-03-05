import { z } from "zod";

export const loanCreateSchema = z.object({
  memberId: z.string().min(1),
  principalPaise: z.number().int().positive(),
  monthlyRateBps: z.number().int().min(0).max(10000),
  durationMonths: z.number().int().min(2).max(240),
  startDate: z.coerce.date(),
});

