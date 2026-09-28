import { z } from "zod";

export const generatePaymentsSchema = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(3000),
}); 

export const recordPaymentSchema = z.object({
  method: z.enum(["CASH", "UPI", "BANK"]),
  paidAt: z.coerce.date().optional(),
});

