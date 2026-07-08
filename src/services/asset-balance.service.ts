import api from "@/lib/axios";
import { AssetBalance } from "@/types/data/asset-balance";

export const assetBalanceService = {
  async findAll(): Promise<{ data: AssetBalance[] }> {
    const res = await api.get("/asset-balances");
    return res.data;
  },
};
