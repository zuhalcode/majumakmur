import { assetService } from "@/services/asset.service";
import { capitalService } from "@/services/capital.service";
import { Asset } from "@/types/data/asset";
import { AssetResponse, UpdateAssetDTO } from "@/types/dto/asset/asset.dto";
import { useCallback, useEffect, useState } from "react";

export function useAssetAPI() {
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

  const createData = useCallback(async (asset: Asset) => {
    setLoading(true);
    await assetService.create(asset);
    setLoading(false);
  }, []);

  const updateData = useCallback(async (dto: UpdateAssetDTO) => {
    setLoading(true);
    await assetService.update(dto.id, dto);
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
