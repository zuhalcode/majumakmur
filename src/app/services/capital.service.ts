import api from "@/lib/axios";
import { Capital } from "@/types/dashboard";

export const capitalService = {
  async findAll(): Promise<{ data: Capital[] }> {
    const res = await api.get("/capitals");
    return res.data;
  },

  async create(data: Capital): Promise<Capital> {
    const res = await api.post("/capitals", data);
    return res.data;
  },

  async update(id: number, updatedData: Partial<Capital>) {
    const res = await api.put(`/capitals/${id}`, updatedData);
    return res.data;
  },

  async remove(id: number) {
    const res = await api.delete(`/capitals/${id}`);
    return res.data;
  },
};
