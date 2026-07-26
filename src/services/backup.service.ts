import api from "@/lib/axios";
import { AxiosResponse } from "axios";

export const backupService = {
  async download(): Promise<AxiosResponse<Blob>> {
    const res = api.get<Blob>("/backups", { responseType: "blob" });
    return res;
  },
};
