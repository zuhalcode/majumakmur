import { capitalService } from "@/features/capitals/api/capital.service";

import {
  CapitalResponse,
  CreateCapitalDTO,
  UpdateCapitalDTO,
} from "@/features/capitals/types/capital.dto";
import { useCallback, useEffect, useState } from "react";
import { CapitalFilters } from "../types/capital-ui";

export function useCapitalAPI() {
  const [data, setData] = useState<CapitalResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async (filters?: CapitalFilters) => {
    try {
      setLoading(true);

      const payload: CapitalFilters = {};

      if (filters?.year && filters?.year !== 0) {
        payload.year = filters.year;
      }

      if (filters?.month && filters?.month !== 0) {
        payload.month = filters.month;
      }

      const { data } = await capitalService.findAll(payload);

      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (dto: CreateCapitalDTO) => {
    setLoading(true);
    await capitalService.create(dto);
    setLoading(false);
  }, []);

  const update = useCallback(async (dto: UpdateCapitalDTO) => {
    setLoading(true);
    await capitalService.update(dto.id, dto);
    setLoading(false);
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    await capitalService.remove(id);
    setLoading(false);
  }, []);

  const destroy = useCallback(async (id: string) => {
    setLoading(true);
    await capitalService.destroy(id);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    fetch,
    create,
    update,
    loading,
  };
}
