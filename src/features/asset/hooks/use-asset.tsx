//#region-imports

import { assetService } from "@/features/asset/services/asset.service";

import { useCallback, useEffect, useState } from "react";
import {
  AssetResponse,
  CreateAssetPayload,
  UpdateAssetPayload,
} from "../types/asset.types";

//#endregion

export function useAsset() {
  const [data, setData] = useState<AssetResponse[]>([]);
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

  const createData = useCallback(async (payload: CreateAssetPayload) => {
    setLoading(true);
    await assetService.create(payload);
    setLoading(false);
  }, []);

  const updateData = useCallback(async (payload: UpdateAssetPayload) => {
    setLoading(true);
    await assetService.update(payload.id, payload);
    setLoading(false);
  }, []);

  const deleteData = useCallback(async (id: string) => {
    setLoading(true);
    await assetService.softDelete(id);
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
