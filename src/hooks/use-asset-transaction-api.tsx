import { assetTransactionService } from "@/services/asset-transaction.service";
import { assetService } from "@/services/asset.service";
import { Asset } from "@/types/data/asset";
import {
  AssetTransaction,
  CreateAssetTransactionDTO,
} from "@/types/dto/asset-transaction/asset-transaction";
import { useCallback, useEffect, useState } from "react";

export function useAssetTransactionAPI() {
  const [data, setData] = useState<AssetTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await assetTransactionService.findAll();

      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createData = useCallback(
    async (assetTransaction: CreateAssetTransactionDTO) => {
      setLoading(true);
      await assetTransactionService.create(assetTransaction);
      setLoading(false);
    },
    [],
  );

  const deleteData = useCallback(async (id: string) => {
    setLoading(true);
    await assetTransactionService.softDelete(id);
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
    deleteData,
  };
}
