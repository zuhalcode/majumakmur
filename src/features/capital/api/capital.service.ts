//#region-imports

import api from "@/lib/axios";

import {
  CapitalResponse,
  UpdateCapitalPayload,
} from "@/features/capital/types/capital.types";
import { CapitalFilters } from "../types/capital-ui";
import { CreateAssetPayload } from "@/features/asset/dto/asset.types";

//#endregion

export const capitalService = {
  async findAll(
    filters?: CapitalFilters,
  ): Promise<{ data: CapitalResponse[] }> {
    const res = await api.get("/capitals", { params: filters });
    return res.data;
  },

  async create(payload: CreateAssetPayload): Promise<CapitalResponse> {
    const res = await api.post("/capitals", payload);
    return res.data;
  },

  async update(
    id: string,
    payload: UpdateCapitalPayload,
  ): Promise<CapitalResponse> {
    const res = await api.patch(`/capitals/${id}`, payload);
    return res.data;
  },

  // Soft Delete
  async remove(id: string) {
    const res = await api.delete(`/capitals/${id}`);
    return res.data;
  },
};
