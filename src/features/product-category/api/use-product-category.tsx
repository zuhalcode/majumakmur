import { useCallback, useEffect, useState } from "react";
import { ProductCategoryResponse } from "../product-category.types";
import { productCategoryService } from "../product-category.service";

export const useProductCategory = () => {
  const [data, setData] = useState<ProductCategoryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await productCategoryService.findAll();
      setData(data);
    } catch (err: any) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
  };
};
