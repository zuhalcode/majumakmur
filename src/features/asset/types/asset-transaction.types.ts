interface AssetTransaction {
  id: string;
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

type CreateAssetTransactionPayload = Omit<AssetTransaction, "id">;

type UpdateAssetTransactionPayload = Partial<Omit<AssetTransaction, "id">> & {
  id: string;
};

interface AssetTransactionHandlers {
  fetch: () => Promise<void>;
  create: (payload: CreateAssetTransactionPayload) => Promise<void>;
  update: (payload: UpdateAssetTransactionPayload) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export type {
  AssetTransactionResponse,
  CreateAssetTransactionPayload,
  UpdateAssetTransactionPayload,
  AssetTransactionHandlers,
};
