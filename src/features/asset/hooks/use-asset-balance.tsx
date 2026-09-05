import { assetBalanceService } from "@/features/asset/services/asset-balance.service";

import { useCallback, useEffect, useState } from "react";
import { AssetBalance } from "../types/asset.types";

export function useAssetBalance() {
  const [data, setData] = useState<AssetBalance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
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
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    fetch,
  };
}
