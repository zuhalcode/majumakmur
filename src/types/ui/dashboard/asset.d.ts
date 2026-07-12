import { Asset } from "@/types/data/asset";
import {
  AssetTransaction,
  CreateAssetTransactionDTO,
} from "@/types/dto/asset-transaction/asset-transaction";

interface AssetCardInfo {
  id: string;
  name: string;
  description?: string;
  value: number;
  unit: string;
  active: boolean;
  percent: number;
}

interface AssetPageProps {
  assets: Asset[];
  assetTransactions: AssetTransaction[];
  cardInfos?: AssetCardInfo[];
  columns: ColumnConfig[];
  loading: boolean;

  fetchAssetBalance: () => Promise<void>;

  fetchAsset: () => Promise<void>;
  createAsset: (asset: Asset) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;

  fetchAssetTransaction: () => Promise<void>;
  createAssetTransaction: (
    assetTransaction: CreateAssetTransactionDTO,
  ) => Promise<void>;
  deleteAssetTransaction: (id: string) => Promise<void>;
}

export type { AssetCardInfo, AssetPageProps };
