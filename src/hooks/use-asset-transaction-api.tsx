//#region-imports
import { assetTransactionService } from "@/services/asset-transaction.service";
import {
  AssetTransactionResponse,
  CreateAssetTransactionDTO,
  UpdateAssetTransactionDTO,
} from "@/types/dto/asset-transaction/asset-transaction.dto";

import { useCallback, useEffect, useState } from "react";

//#endregion

export function useAssetTransactionAPI() {
  const [data, setData] = useState<AssetTransactionResponse[]>([]);
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

  const updateData = useCallback(async (dto: UpdateAssetTransactionDTO) => {
    setLoading(true);
    await assetTransactionService.update(dto.id, dto);
    setLoading(false);
  }, []);

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
    updateData,
    deleteData,
  };
}
