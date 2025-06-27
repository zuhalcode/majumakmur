import api from "@/lib/axios";

export const productService = {
  findAll: async () => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  findById: async (id: string) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },
};
