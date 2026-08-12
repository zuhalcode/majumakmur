import api from "@/lib/axios";

import {
  CapitalResponse,
  CreateCapitalDTO,
  UpdateCapitalDTO,
} from "@/features/capitals/types/capital.dto";
import { CapitalFilters } from "../types/capital-ui";

export const capitalService = {
  async findAll(
    filters?: CapitalFilters,
  ): Promise<{ data: CapitalResponse[] }> {
    const res = await api.get("/capitals", { params: filters });
    return res.data;
  },

  async create(dto: CreateCapitalDTO): Promise<CapitalResponse> {
    const res = await api.post("/capitals", dto);
    return res.data;
  },

  async update(id: string, dto: UpdateCapitalDTO): Promise<CapitalResponse> {
    const res = await api.patch(`/capitals/${id}`, dto);
    return res.data;
  },

  // Soft Delete
  async remove(id: string) {
    const res = await api.delete(`/capitals/${id}`);
    return res.data;
  },

  // Hard Delete
  async destroy(id: string) {
    const res = await api.delete(`/capitals/${id}`);
    return res.data;
  },
};
