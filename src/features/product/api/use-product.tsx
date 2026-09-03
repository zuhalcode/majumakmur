import { createClient } from "@/app/utils/supabase/client";
import { productService } from "@/features/product/product.service";
import { useCallback, useEffect, useState } from "react";
import {
  CreateProductPayload,
  ProductResponse,
  UpdateProductPayload,
} from "../product.types";

export const useProduct = () => {
  const [data, setData] = useState<ProductResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
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

  const create = useCallback(async (payload: CreateProductPayload) => {
    setError(null);

    try {
      const res = await productService.create(payload);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  }, []);

  const update = useCallback(async (payload: UpdateProductPayload) => {
    setError(null);

    try {
      const res = await productService.update(payload);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    await productService.remove(id);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    error,
    loading,
    create,
    update,
    remove,
    refetch: fetch,
  };
};
