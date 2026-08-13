import { assetBalanceService } from "@/features/asset/services/asset-balance.service";
import { AssetBalance } from "@/features/asset/types/asset-balance.type";
import { useCallback, useEffect, useState } from "react";

export function useAssetBalanceAPI() {
  const [data, setData] = useState<AssetBalance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await assetBalanceService.findAll();

      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    fetchData,
  };
}
