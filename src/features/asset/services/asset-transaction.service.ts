//#region-imports

import api from "@/lib/axios";
import {
  AssetTransactionResponse,
  CreateAssetTransactionPayload,
  UpdateAssetTransactionPayload,
} from "../types/asset-transaction.types";

//#endregion

export const assetTransactionService = {
  async findAll(): Promise<{ data: AssetTransactionResponse[] }> {
    const res = await api.get("/asset-transactions");
    return res.data;
  },

  async create(
    payload: CreateAssetTransactionPayload,
  ): Promise<AssetTransactionResponse> {
    const res = await api.post("/asset-transactions", payload);
    return res.data;
  },

  async update(
    id: string,
    payload: UpdateAssetTransactionPayload,
  ): Promise<AssetTransactionResponse> {
    const res = await api.patch(`/asset-transactions/${id}`, payload);
    return res.data;
  },

  async remove(id: string) {
    const res = await api.delete(`/asset-transactions/${id}`);
    return res.data;
  },
};
