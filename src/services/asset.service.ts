import api from "@/lib/axios";
import { Asset } from "@/types/data/asset";
import { CreateAssetDTO, UpdateAssetDTO } from "@/types/dto/asset/asset.dto";

export const assetService = {
  async findAll(): Promise<{ data: Asset[] }> {
    const res = await api.get("/assets");
    return res.data;
  },

  async create(dto: CreateAssetDTO): Promise<Asset> {
    const res = await api.post("/assets", dto);
    return res.data;
  },

  async update(id: string, dto: UpdateAssetDTO) {
    const res = await api.patch(`/assets/${id}`, dto);
    return res.data;
  },

  async softDelete(id: string) {
    const res = await api.delete(`/assets/${id}`);
    return res.data;
  },
};
