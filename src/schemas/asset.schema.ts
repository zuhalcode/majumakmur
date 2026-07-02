import { z } from "zod";

export const assetFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  description: z.string().trim().optional(),
  unit: z.string().trim().min(1, { message: "Unit is required" }),
});

export type AssetForm = z.infer<typeof assetFormSchema>;
