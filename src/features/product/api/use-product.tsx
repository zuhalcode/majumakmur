import { createClient } from "@/app/utils/supabase/client";
import { productService } from "@/features/product/product.service";
import { useCallback, useEffect, useState } from "react";
import { CreateProductPayload, ProductResponse } from "../product.types";

export const useProduct = () => {
  const [data, setData] = useState<ProductResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await productService.findAll();
      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createData = useCallback(async (payload: CreateProductPayload) => {
    setError(null);

    try {
      const res = await productService.create(payload);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  }, []);

  const deleteData = useCallback(async (id: number) => {
    if (!id) {
      setError("ID tidak valid untuk penghapusan.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error sebelum memulai operasi

    if (error) {
      console.log(error);
      setError(error);
      fetchData();
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    loading,
    createData,
    deleteData,
    refetch: fetchData,
  };
};
