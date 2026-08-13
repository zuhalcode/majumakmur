//#region-imports

import { CreateAssetDTO, UpdateAssetDTO } from "../dto/asset.dto";

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

interface AssetBalance {
  id: string;
  name: string;
  description?: string;
  value: number;
  unit: string;
}

export type { AssetCardInfo, AssetHandlers, AssetBalance };
