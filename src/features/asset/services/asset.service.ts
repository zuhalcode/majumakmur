import api from "@/lib/axios";
import {
  AssetResponse,
  CreateAssetDTO,
  UpdateAssetDTO,
} from "@/features/asset/asset.dto";

export const assetService = {
  async findAll(): Promise<{ data: AssetResponse[] }> {
    const res = await api.get("/assets");
    return res.data;
  },

  async create(dto: CreateAssetDTO): Promise<AssetResponse> {
    const res = await api.post("/assets", dto);
    return res.data;
  },

  async update(id: string, dto: UpdateAssetDTO): Promise<AssetResponse> {
    const res = await api.patch(`/assets/${id}`, dto);
    return res.data;
  },

  async softDelete(id: string): Promise<void> {
    const res = await api.delete(`/assets/${id}`);
    return res.data;
  },
};
