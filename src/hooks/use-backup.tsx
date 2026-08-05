import { useCallback, useEffect, useState } from "react";
import { backupService } from "@/services/backup.service";

export function useBackup() {
  const [loading, setLoading] = useState<boolean>(false);

  const backup = useCallback(async () => {
    try {
      setLoading(true);

      const res = await backupService.download();
      const blob = res.data;

      const contentDisposition = res.headers["content-disposition"];

      const filename =
        contentDisposition?.match(/filename="?(.+?)"?$/)?.[1] ??
        `backup-${new Date().toISOString()}.json`;

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    backup,
    loading,
  };
}
