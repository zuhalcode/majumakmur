import api from "@/lib/axios";
import { Asset } from "@/types/data/asset";
import { AssetTransaction } from "@/types/data/asset-transaction";

export const assetTransactionService = {
  async findAll(): Promise<{ data: AssetTransaction[] }> {
    const res = await api.get("/asset-transactions");
    return res.data;
  },

  async create(data: AssetTransaction): Promise<AssetTransaction> {
    const res = await api.post("/asset-transactions", data);
    return res.data;
  },

  async update(id: number, updatedData: Partial<Asset>) {
    const res = await api.put(`/assets/${id}`, updatedData);
    return res.data;
  },

  async softDelete(id: string) {
    const res = await api.delete(`/assets/${id}`);
    return res.data;
  },
};
