import { createClient } from "@/app/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

const supabase = createClient();

type Capital = {
  id?: number;
  capital: number;
  purchase: number;
  sell: number;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
};

export const useFetchCapital = () => {
  const [data, setData] = useState<Capital[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, count, error, status, statusText } = await supabase
      .from("capitals")
      .select("*")
      .order("date", { ascending: false });

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

  const insertData = useCallback(async (transaction: Capital) => {
    setLoading(true);
    const { error } = await supabase.from("capitals").insert([transaction]);

    if (error) setError(error.message);

    setLoading(false);
  }, []);

  const groupDataByMonth = () => {
    const grouped: { date: string; data: Capital[]; totalPurchase: number }[] =
      [];

    data.forEach((item) => {
      const date = new Date(item.date).toLocaleString("default", {
        month: "2-digit",
        year: "2-digit",
      });

      // Cek apakah bulan sudah ada dalam grouped
      const existingGroup = grouped.find((group) => group.date === date);

      if (existingGroup) {
        existingGroup.data.push(item); // Tambahkan transaksi ke bulan yang ada
        existingGroup.totalPurchase += item.purchase; // Tambahkan purchase ke total untuk bulan ini
      } else {
        // Jika belum ada, buat grup baru untuk bulan ini
        grouped.push({ date, data: [item], totalPurchase: item.purchase });
      }
    });

    return grouped;
  };

  const groupedData = groupDataByMonth();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    dataByMonth: groupedData,
    count,
    error,
    status,
    statusText,
    loading,
    insertData,
    refetch: fetchData,
  };
};
