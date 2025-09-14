import { capitalService } from "@/services/capital.service";
import { Capital } from "@/types/data/capital";

import { useCallback, useEffect, useState } from "react";

export function useCapitalAPI() {
  const [data, setData] = useState<Capital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await capitalService.findAll();
      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createData = useCallback(async (capital: Capital) => {
    setLoading(true);
    await capitalService.create(capital);
    setLoading(false);
  }, []);

  const deleteData = useCallback(async (id: number) => {
    setLoading(true);
    await capitalService.remove(id);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    refetch: fetchData,
    createData,
    deleteData,
    loading,
  };
}
