import api from "@/lib/axios";
import { TrashItem, TrashResource } from "../trash";

export const trashService = {
  async findAll(): Promise<{ data: TrashItem[] }> {
    const res = await api.get("/trash");
    return res.data;
  },

  async restore(resource: TrashResource, id: string): Promise<void> {
    return await api.post(`/trash/${resource}/${id}`);
  },

  async destroy(resource: TrashResource, id: string): Promise<void> {
    return await api.delete(`/trash/${resource}/${id}`);
  },
};
