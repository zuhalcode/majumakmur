import { createClient } from "@/app/utils/supabase/client";
import { Gold } from "@/types/data/gold";
import { useCallback, useEffect, useState } from "react";

const supabase = createClient();

export const useFetchGoldType = () => {
  const [data, setData] = useState<Gold[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, count, error, status, statusText } = await supabase
      .from("gold_types")
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

  const insertData = useCallback(async (goldType: Gold) => {
    setLoading(true);
    const { error } = await supabase.from("gold_types").insert([goldType]);

    if (error) setError(error.message);

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
    refetch: fetchData,
  };
};
