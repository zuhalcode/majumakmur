import api from "@/lib/axios";
import { CreateProductPayload, ProductResponse } from "./product.types";

export const productService = {
  async findAll(): Promise<{ data: ProductResponse[] }> {
    const res = await api.get("/products");
    return res.data;
  },

  async create(
    data: FormData | CreateProductPayload,
  ): Promise<ProductResponse> {
    const res = await api.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async update(id: number, updatedData: Partial<ProductResponse>) {
    const res = await api.put(`/products/${id}`, updatedData);
    return res.data;
  },

  async remove(id: number) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
