//#region-imports

import { Asset } from "@/types/data/asset";
import {
  AssetTransaction,
  CreateAssetTransactionDTO,
} from "@/types/dto/asset-transaction/asset-transaction";
import { AssetTransactionHandlers } from "../../types/ui/dashboard/asset-transaction";
import { AssetResponse } from "@/features/assets/asset.dto";

//#endregion

interface AssetCardInfo {
  id: string;
  name: string;
  description?: string;
  value: number;
  unit: string;
  active: boolean;
  percent: number;
}

interface AssetHandlers {
  fetch: () => Promise<void>;
  create: (dto: CreateAssetDTO) => Promise<void>;
  update: (dto: UpdateAssetDTO) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export type { AssetCardInfo, AssetPageProps, AssetHandlers };
