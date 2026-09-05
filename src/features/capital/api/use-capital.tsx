//#region-imports

import { useCallback, useEffect, useState } from "react";
import { CapitalFilters } from "../types/capital-ui";
import {
  CapitalResponse,
  CreateCapitalPayload,
  UpdateCapitalPayload,
} from "../types/capital.types";
import { capitalService } from "./capital.service";

//#endregion

export function useCapital() {
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

  const create = useCallback(async (payload: CreateCapitalPayload) => {
    setLoading(true);
    await capitalService.create(payload);
    setLoading(false);
  }, []);

  const update = useCallback(async (payload: UpdateCapitalPayload) => {
    setLoading(true);
    await capitalService.update(payload.id, payload);
    setLoading(false);
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    await capitalService.remove(id);
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
