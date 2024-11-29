import { createClient } from "@/app/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

const supabase = createClient();

type Gold = {
  id: number;
  name: string;
  price: number;
  created_at: Date;
};

export const useFetchGold = () => {
  const [data, setData] = useState<Gold[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const { data, count, error, status, statusText } = await supabase
      .from("global_golds")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      setError(error.message);
    } else {
      setData(data);
      setCount(count);
      setStatusText(statusText);
      setStatus(status);
    }
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
    refetch: fetchData,
  };
};
