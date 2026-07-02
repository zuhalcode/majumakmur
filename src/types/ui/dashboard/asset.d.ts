import { Asset } from "@/types/data/asset";

interface AssetCardInfo {
  title: string;
  desc?: string;
  percent: number;
  active: boolean;
  unit: string;
}

interface AssetPageProps {
  data: Asset[];
  cardInfos?: AssetCardInfo[];
  columns: ColumnConfig[];
  loading: boolean;
  fetchData: () => Promise<void>;
  createData: (asset: Asset) => Promise<void>;
}

export type { AssetCardInfo, AssetPageProps };
