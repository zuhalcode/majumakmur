import api from "@/lib/axios";
import { ProductCategoryResponse } from "./product-category.types";

export const productCategoryService = {
  async findAll(): Promise<{ data: ProductCategoryResponse[] }> {
    const res = await api.get("/product-categories");
    return res.data;
  },
};
