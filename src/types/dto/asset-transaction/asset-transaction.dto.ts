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

type UpdateAssetTransactionDTO = Partial<CreateAssetTransactionDTO> & {
  id: string;
};

interface AssetTransactionResponse extends AssetTransaction {
  source_asset?: { name: string; unit: string };
  destination_asset?: { name: string; unit: string };
}

export type {
  AssetTransaction,
  AssetTransactionResponse,
  CreateAssetTransactionDTO,
  UpdateAssetTransactionDTO,
};
