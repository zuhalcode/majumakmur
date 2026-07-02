import { assetService } from "@/services/asset.service";
import { capitalService } from "@/services/capital.service";
import { Asset } from "@/types/data/asset";
import { useCallback, useEffect, useState } from "react";

export function useAssetAPI() {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await assetService.findAll();

      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createData = useCallback(async (asset: Asset) => {
    setLoading(true);
    await assetService.create(asset);
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
    loading,
    fetchData,
    createData,
  };
}
