interface Asset {
  name: string;
  description?: string;
  unit: string;
}

interface AssetSummary {
  gold: number;
  capitalCash: number;
  personalCash: number;
}

export type { Asset, AssetSummary };
