import api from "@/lib/axios";
import { CreateProductPayload, ProductResponse } from "./product.types";

export const productService = {
  async findAll(): Promise<{ data: ProductResponse[] }> {
    const res = await api.get("/products");
    return res.data;
  },

  async create(
    payload: FormData | CreateProductPayload,
  ): Promise<ProductResponse> {
    console.log("ini payload Product service : ", payload);

    const res = await api.post("/products", payload);

    console.log("ini response Product service : ", res);

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
