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

  const fetch = useCallback(async () => {
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

  const create = useCallback(async (payload: CreateAssetPayload) => {
    setLoading(true);
    await assetService.create(payload);
    setLoading(false);
  }, []);

  const update = useCallback(async (payload: UpdateAssetPayload) => {
    setLoading(true);
    await assetService.update(payload.id, payload);
    setLoading(false);
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    await assetService.softDelete(id);
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
