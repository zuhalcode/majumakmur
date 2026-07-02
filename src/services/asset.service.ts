import api from "@/lib/axios";
import { Asset } from "@/types/data/asset";

export const assetService = {
  async findAll(): Promise<{ data: Asset[] }> {
    const res = await api.get("/assets");
    return res.data;
  },

  async create(data: Asset): Promise<Asset> {
    const res = await api.post("/assets", data);
    return res.data;
  },

  async update(id: number, updatedData: Partial<Asset>) {
    const res = await api.put(`/assets/${id}`, updatedData);
    return res.data;
  },

  async remove(id: number) {
    const res = await api.delete(`/assets/${id}`);
    return res.data;
  },
};
