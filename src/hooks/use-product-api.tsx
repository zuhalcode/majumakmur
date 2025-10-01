import { createClient } from "@/app/utils/supabase/client";
import { productService } from "@/services/product.service";
import { Product } from "@/types/data/product";
import { useCallback, useEffect, useState } from "react";

const supabase = createClient();

export const useProductAPI = () => {
  const [data, setData] = useState<Product[]>([]);
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

  const createData = useCallback(async (formData: FormData) => {
    setError(null);

    try {
      const res = await productService.create(formData);
      console.log("useproduct res : ", res);
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

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.log(error);
      setError(error.message);
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
