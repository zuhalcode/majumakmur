import { Asset } from "@/types/data/asset";
import { AssetTransaction } from "@/types/data/asset-transaction";

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

  fetchAsset: () => Promise<void>;
  createAsset: (asset: Asset) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;

  fetchAssetTransaction: () => Promise<void>;
  createAssetTransaction: (assetTransaction: AssetTransaction) => Promise<void>;
}

export type { AssetCardInfo, AssetPageProps };
