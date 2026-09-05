//#region-imports
import { assetTransactionService } from "@/features/asset/services/asset-transaction.service";

import { useCallback, useEffect, useState } from "react";
import {
  AssetTransactionResponse,
  CreateAssetTransactionPayload,
  UpdateAssetTransactionPayload,
} from "../types/asset-transaction.types";

//#endregion

export function useAssetTransaction() {
  const [data, setData] = useState<AssetTransactionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
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

  const create = useCallback(async (payload: CreateAssetTransactionPayload) => {
    setLoading(true);
    await assetTransactionService.create(payload);
    setLoading(false);
  }, []);

  const update = useCallback(async (payload: UpdateAssetTransactionPayload) => {
    setLoading(true);
    await assetTransactionService.update(payload.id, payload);
    setLoading(false);
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    await assetTransactionService.remove(id);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    fetch,
    create,
    update,
    remove,
  };
}
