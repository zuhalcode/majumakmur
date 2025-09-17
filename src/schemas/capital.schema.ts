import { z } from "zod";

export const capitalFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  capital: z.string().min(0).optional(),
  purchase: z.string().min(0).optional(),
  sell: z.string().min(0).optional(),
});

export type CapitalForm = z.infer<typeof capitalFormSchema>;
