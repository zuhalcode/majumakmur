import api from "@/lib/axios";
import {
  CreateProductPayload,
  ProductResponse,
  UpdateProductPayload,
} from "./product.types";

export const productService = {
  async findAll(): Promise<{ data: ProductResponse[] }> {
    const res = await api.get("/products");
    return res.data;
  },

  async create(
    payload: FormData | CreateProductPayload,
  ): Promise<ProductResponse> {
    const res = await api.post("/products", payload);
    return res.data;
  },

  async update({ id, ...payload }: UpdateProductPayload) {
    const res = await api.patch(`/products/${id}`, payload);
    return res.data;
  },

  async remove(id: string) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
