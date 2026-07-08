interface CreateAssetTransactionDTO {
  source_asset_id: string;
  source_quantity: number;

  destination_asset_id: string;
  destination_quantity: number;

  description?: string;
}

export type { CreateAssetTransactionDTO };
