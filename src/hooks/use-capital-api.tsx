import { Capital, capitalService } from "@/app/services/capital.service";
import { useCallback, useEffect, useState } from "react";

export function useCapitalAPI() {
  const [data, setData] = useState<Capital[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await capitalService.findAll();
      setData(res);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    // loading,
    // error,
  };
}
