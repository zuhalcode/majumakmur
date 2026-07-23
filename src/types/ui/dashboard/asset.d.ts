//#region-imports

import { Asset } from "@/types/data/asset";
import {
  AssetTransaction,
  CreateAssetTransactionDTO,
} from "@/types/dto/asset-transaction/asset-transaction";
import { AssetTransactionHandlers } from "./asset-transaction";

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

interface AssetPageProps {
  assets: Asset[];
  loadingAsset: boolean;

  assetTransactions: AssetTransaction[];
  loadingAssetTransaction: boolean;

  cardInfos?: AssetCardInfo[];

  fetchAssetBalance: () => Promise<void>;

  fetchAsset: AssetHandlers["fetch"];
  createAsset: AssetHandlers["create"];
  updateAsset: AssetHandlers["update"];
  deleteAsset: AssetHandlers["delete"];

  fetchAssetTransaction: AssetTransactionHandlers["fetch"];
  createAssetTransaction: AssetTransactionHandlers["create"];
  updateAssetTransaction: AssetTransactionHandlers["update"];
  deleteAssetTransaction: AssetTransactionHandlers["delete"];
}

export type { AssetCardInfo, AssetPageProps, AssetHandlers };
