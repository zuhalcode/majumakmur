//#region-imports

import { useCallback, useEffect, useState } from "react";
import { trashService } from "./trash.service";
import { TrashItem, TrashResource } from "../trash";

//#endregion

export function useTrash() {
  const [data, setData] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await trashService.findAll();

      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const restore = useCallback(async (resource: TrashResource, id: string) => {
    await trashService.restore(resource, id);
  }, []);
  const destroy = useCallback(async (resource: TrashResource, id: string) => {
    await trashService.destroy(resource, id);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    refetch: fetch,
    restore,
    destroy,
  };
}
