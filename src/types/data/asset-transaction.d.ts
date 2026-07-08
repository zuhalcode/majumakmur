interface AssetTransaction {
  id?: string;
  source_asset_id: string;
  source_quantity: number;
  source_asset?: { name: string; unit: string };

  destination_asset_id: string;
  destination_quantity: number;
  destination_asset?: { name: string; unit: string };

  description?: string;
}

export type { AssetTransaction };
