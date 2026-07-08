import { z } from "zod";

export const assetTransactionFormSchema = z.object({
  source_asset_id: z.string().min(1, "Source asset is required"),
  source_quantity: z.string().min(1),

  destination_asset_id: z.string().min(1, "Destination asset is required"),
  destination_quantity: z.string().min(1),

  description: z.string().optional(),
});

export type AssetTransactionForm = z.infer<typeof assetTransactionFormSchema>;
