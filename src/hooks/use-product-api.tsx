import { createClient } from "@/app/utils/supabase/client";
import { Product } from "@/types/data/product";
import { useCallback, useEffect, useState } from "react";

const supabase = createClient();

export const useFetchProduct = () => {
  const [data, setData] = useState<Product[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const table: string = "products";

  const fetchData = useCallback(async () => {
    setLoading(true);

    const { data, count, error, status, statusText } = await supabase
      .from(table)
      .select("*, categories (name), gold_types(karat)");

    if (error) {
      setError(error.message);
    } else {
      setData(data);
      setCount(count);
      setStatusText(statusText);
      setStatus(status);
    }
    setLoading(false);
  }, []);

  const insertData = useCallback(async (product: Product) => {
    setLoading(true);

    const { code } = product;

    const { data: latestProduct, error: latestProductError } = await supabase
      .from(table)
      .select()
      .ilike("code", `${code}%`)
      .order("code", { ascending: false })
      .limit(1);

    if (latestProductError) {
      setError(latestProductError.message);
      setLoading(false);
      return;
    }

    let newCode = `${code}0001`;
    if (latestProduct && latestProduct.length > 0) {
      const latestCode = latestProduct[0].code;
      const numericPartLatestCode = parseInt(latestCode.slice(2), 10);
      newCode = `${code}${String(numericPartLatestCode + 1).padStart(4, "0")}`;
    }

    const newProduct = {
      ...product,
      code: newCode,
      gold_type_id: 5,
      status: "active",
    };

    const { error: insertError } = await supabase
      .from(table)
      .insert([newProduct]);

    if (insertError) setError(insertError.message);

    setLoading(false);
  }, []);

  const deleteData = useCallback(async (id: number) => {
    if (!id) {
      setError("ID tidak valid untuk penghapusan.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error sebelum memulai operasi

    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      console.log(error);
      setError(error.message);
      fetchData();
    }

    console.log("aman bolo");

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    count,
    error,
    status,
    statusText,
    loading,
    insertData,
    deleteData,
    refetch: fetchData,
  };
};
