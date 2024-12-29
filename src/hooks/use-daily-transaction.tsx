import { createClient } from "@/app/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

const supabase = createClient();

type DailyTransaction = {
  id?: number;
  buy_date: Date;
  buy_price: number;
  sell_date: Date;
  sell_price: number;
  profit?: number;
  created_at?: Date;
  updated_at?: Date;
};

export const useFetchDailyTransaction = () => {
  const [data, setData] = useState<DailyTransaction[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const table: string = "daily_transactions";

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, count, error, status, statusText } = await supabase
      .from(table)
      .select("*")
      .order("sell_date", { ascending: false });

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

  const insertData = useCallback(async (transaction: DailyTransaction) => {
    setLoading(true);
    const { error } = await supabase.from(table).insert([transaction]);

    if (error) setError(error.message);

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
