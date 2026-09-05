import { z } from "zod";

export const createCapitalFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  capital: z.string().min(0).optional(),
  purchase: z.string().min(0).optional(),
  sell: z.string().min(0).optional(),
});

export type CreateCapitalForm = z.infer<typeof createCapitalFormSchema>;
