interface AssetTransaction {

  date: string;

  source_asset_id?: string;
  source_quantity?: number;

  destination_asset_id?: string;
  destination_quantity?: number;

  description?: string;
}

interface AssetTransactionResponse extends AssetTransaction {
  source_asset?: { name: string; unit: string };
  destination_asset?: { name: string; unit: string };
}

type CreateAssetTransactionDTO = Omit<AssetTransaction, "id">;

export type {
  AssetTransaction,
  AssetTransactionResponse,
  CreateAssetTransactionDTO,
};
