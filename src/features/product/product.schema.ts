import { z } from "zod";
import { ProductStatus } from "./product.types";

export const productFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Max file size is 5MB.",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    {
      message: "Only .jpg, .png, .webp formats are supported.",
    },
  );

export const createProductFormSchema = z.object({
  category_code: z.string(),
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  karat: z.union([z.literal(6), z.literal(8), z.literal(16)]),
  weight: z.number(),
  status: z.nativeEnum(ProductStatus),
  // image: productFileSchema,
});

export type ProductForm = z.infer<typeof createProductFormSchema>;
