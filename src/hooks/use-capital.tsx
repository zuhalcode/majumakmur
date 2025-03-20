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

  const table = "capitals";

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, count, error, status, statusText } = await supabase
      .from(table)
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

  const insertData = useCallback(async (capital: Capital) => {
    setLoading(true);
    const { error } = await supabase.from(table).insert([capital]);

    if (error) setError(error.message);

    setLoading(false);
  }, []);

  const editData = useCallback(
    async (id: number, updatedData: Record<string, any>) => {
      try {
        setLoading(true);

        // Memperbarui data berdasarkan ID
        const { error } = await supabase
          .from(table)
          .update(updatedData) // Data yang ingin diperbarui
          .eq("id", id); // Filter berdasarkan ID

        if (error) {
          throw new Error(error.message); // Lempar error jika terjadi kegagalan
        }

        console.log(`Data dengan ID ${id} berhasil diperbarui.`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteData = useCallback(async (id: number) => {
    if (!id) {
      setError("ID tidak valid untuk penghapusan.");
      return;
    }

    setLoading(true);
    setError(null);

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

  const groupDataByMonth = (year: string = "0000") => {
    const grouped: { date: string; data: Capital[]; totalPurchase: number }[] =
      [];

    const filteredData =
      year === "0000"
        ? data
        : data.filter(
            (item) => new Date(item.date).getFullYear().toString() === year
          );

    filteredData.forEach((item) => {
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

  return {
    data,
    dataByMonth: groupedData,
    count,
    error,
    status,
    statusText,
    loading,
    insertData,
    deleteData,
    editData,
    refetch: fetchData,
    groupDataByMonth,
  };
};
