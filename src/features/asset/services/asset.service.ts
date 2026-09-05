import api from "@/lib/axios";
import {
  AssetResponse,
  CreateAssetPayload,
  UpdateAssetPayload,
} from "../types/asset.types";

export const assetService = {
  async findAll(): Promise<{ data: AssetResponse[] }> {
    const res = await api.get("/assets");
    return res.data;
  },

  async create(payload: CreateAssetPayload): Promise<AssetResponse> {
    const res = await api.post("/assets", payload);
    return res.data;
  },

  async update(
    id: string,
    payload: UpdateAssetPayload,
  ): Promise<AssetResponse> {
    const res = await api.patch(`/assets/${id}`, payload);
    return res.data;
  },

  async softDelete(id: string): Promise<void> {
    const res = await api.delete(`/assets/${id}`);
    return res.data;
  },
};
