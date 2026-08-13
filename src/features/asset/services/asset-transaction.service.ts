//#region-imports

import api from "@/lib/axios";

import {
  AssetTransaction,
  AssetTransactionResponse,
  CreateAssetTransactionDTO,
  UpdateAssetTransactionDTO,
} from "@/features/asset/dto/asset-transaction.dto";

//#endregion

export const assetTransactionService = {
  async findAll(): Promise<{ data: AssetTransactionResponse[] }> {
    const res = await api.get("/asset-transactions");
    return res.data;
  },

  async create(data: CreateAssetTransactionDTO): Promise<AssetTransaction> {
    const res = await api.post("/asset-transactions", data);
    return res.data;
  },

  async update(
    id: string,
    data: UpdateAssetTransactionDTO,
  ): Promise<AssetTransaction> {
    const res = await api.patch(`/asset-transactions/${id}`, data);
    return res.data;
  },

  async softDelete(id: string) {
    const res = await api.delete(`/asset-transactions/${id}`);
    return res.data;
  },
};
