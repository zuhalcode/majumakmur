interface AssetTransaction {
  id: string;
  date: string;

  source_asset_id?: string;
  source_quantity?: number;

  destination_asset_id?: string;
  destination_quantity?: number;

  description?: string;
}

type CreateAssetTransactionDTO = Omit<AssetTransaction, "id">;

interface AssetTransactionResponse extends AssetTransaction {
  id: string;
  source_asset?: { name: string; unit: string };
  destination_asset?: { name: string; unit: string };
}

export type {
  AssetTransaction,
  AssetTransactionResponse,
  CreateAssetTransactionDTO,
};
