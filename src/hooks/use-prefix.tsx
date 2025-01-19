import { createClient } from "@/app/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

const supabase = createClient();

export type Prefix = {
  id?: number;
  code: string;
  desc?: string;
  created_at?: Date;
};

export const useFetchPrefix = () => {
  const [data, setData] = useState<Prefix[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const table: string = "prefixes";

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, count, error, status, statusText } = await supabase
      .from(table)
      .select("*");

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

  const insertData = useCallback(async (prefix: Prefix) => {
    setLoading(true);
    const { error } = await supabase.from(table).insert([prefix]);

    if (error) setError(error.message);

    setLoading(false);
  }, []);

  const editData = useCallback(async (id: number, prefix: Prefix) => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from(table)
        .update({ code: prefix.code, desc: prefix.desc })
        .eq("id", id);

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      console.error("Error updating data:", err);
      setError("Something went wrong while updating the data");
    } finally {
      setLoading(false); // Menandakan bahwa operasi selesai
    }
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
    editData,
    deleteData,
    refetch: fetchData,
  };
};
