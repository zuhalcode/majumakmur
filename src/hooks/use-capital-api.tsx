import { capitalService } from "@/services/capital.service";
import { Capital, CapitalFilters } from "@/types/data/capital";
import { useCallback, useEffect, useState } from "react";

export function useCapitalAPI() {
  const [data, setData] = useState<Capital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (filters?: CapitalFilters) => {
    try {
      setLoading(true);

      const payload: CapitalFilters = {};

      if (filters?.year && filters?.year !== 0) {
        payload.year = filters.year;
      }

      if (filters?.month && filters?.month !== 0) {
        payload.month = filters.month;
      }

      console.log(`payload : ${payload.year} | ${payload.month}`);

      const { data } = await capitalService.findAll(payload);

      setData(data);
      // console.log(data);
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
    fetchData,
    createData,
    deleteData,
    loading,
  };
}
