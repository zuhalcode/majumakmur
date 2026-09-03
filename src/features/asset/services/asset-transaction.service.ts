//#region-imports

import api from "@/lib/axios";

import {
  AssetTransaction,
  AssetTransactionResponse,
  CreateAssetTransactionPayload,
  UpdateAssetTransactionPayload,
} from "@/features/asset/dto/asset-transaction.types";

//#endregion

export const assetTransactionService = {
  async findAll(): Promise<{ data: AssetTransactionResponse[] }> {
    const res = await api.get("/asset-transactions");
    return res.data;
  },

  async create(
    payload: CreateAssetTransactionPayload,
  ): Promise<AssetTransaction> {
    const res = await api.post("/asset-transactions", payload);
    return res.data;
  },

  async update(
    id: string,
    payload: UpdateAssetTransactionPayload,
  ): Promise<AssetTransaction> {
    const res = await api.patch(`/asset-transactions/${id}`, payload);
    return res.data;
  },

  async softDelete(id: string) {
    const res = await api.delete(`/asset-transactions/${id}`);
    return res.data;
  },
};
