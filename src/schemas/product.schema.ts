import { z } from "zod";

export const productFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Max file size is 5MB.",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    {
      message: "Only .jpg, .png, .webp formats are supported.",
    }
  );

export const productFormSchema = z.object({
  code: z.string(),
  gold_type: z.string().min(1),
  name: z.string().min(1),
  desc: z.string().min(1).optional(),
  weight: z.string(),
  image: productFileSchema,
  status: z.string(),
});

export type ProductForm = z.infer<typeof productFormSchema>;
