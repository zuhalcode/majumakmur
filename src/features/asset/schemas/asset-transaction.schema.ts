import { z } from "zod";

export const assetTransactionFormSchema = z
  .object({
    id: z.string().optional(),
    source_asset_id: z.string().optional(),
    source_quantity: z.string().optional(),

    destination_asset_id: z.string().optional(),
    destination_quantity: z.string().optional(),

    description: z.string().optional(),
    date: z.string().min(1, "Date is required"),
  })
  .superRefine((data, ctx) => {
    const hasSource = !!data.source_asset_id && data.source_asset_id !== "none";

    const hasDestination =
      !!data.destination_asset_id && data.destination_asset_id !== "none";

    const sourceQty = Number(data.source_quantity || 0);
    const destinationQty = Number(data.destination_quantity || 0);

    // Destination wajib dipilih
    if (!hasDestination) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["destination_asset_id"],
        message: "Destination Asset wajib dipilih.",
      });
    }

    // Source kosong => quantity source harus kosong / 0
    if (!hasSource && sourceQty > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["source_quantity"],
        message:
          "Source Quantity harus kosong jika Source Asset tidak dipilih.",
      });
    }

    // Destination kosong => quantity destination harus kosong / 0
    if (!hasDestination && destinationQty > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["destination_quantity"],
        message:
          "Destination Quantity harus kosong jika Destination Asset tidak dipilih.",
      });
    }

    // Source dipilih => qty wajib > 0
    if (hasSource && sourceQty <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["source_quantity"],
        message: "Source Quantity harus lebih dari 0.",
      });
    }

    // Destination dipilih => qty wajib > 0
    if (hasDestination && destinationQty <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["destination_quantity"],
        message: "Destination Quantity harus lebih dari 0.",
      });
    }
  });

export type AssetTransactionForm = z.infer<typeof assetTransactionFormSchema>;
