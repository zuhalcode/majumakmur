import api from "@/lib/axios";

export type Capital = {
  id?: number;
  capital: number;
  purchase: number;
  sell: number;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
};

export const capitalService = {
  async findAll() {
    const res = await api.get("/capitals");
    return res.data;
  },

  async insert(data: Capital) {
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
