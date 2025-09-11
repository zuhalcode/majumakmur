import api from "@/lib/axios";
import { Product } from "@/types/data/product";

export const productService = {
  async findAll(): Promise<{ data: Product[] }> {
    const res = await api.get("/products");
    return res.data;
  },

  async create(data: Product): Promise<Product> {
    const res = await api.post("/products", data);
    return res.data;
  },

  async update(id: number, updatedData: Partial<Product>) {
    const res = await api.put(`/products/${id}`, updatedData);
    return res.data;
  },

  async remove(id: number) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
