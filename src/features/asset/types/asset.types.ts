interface Asset {
  id: string;
  name: string;
  description?: string;
  unit: string;
}

type CreateAssetPayload = Omit<Asset, "id">;

type UpdateAssetPayload = Partial<CreateAssetPayload> & {
  id: string;
};

type AssetResponse = Asset & { has_transaction?: boolean };

interface AssetHandlers {
  fetch: () => Promise<void>;
  create: (payload: CreateAssetPayload) => Promise<void>;
  update: (payload: UpdateAssetPayload) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

interface AssetBalance {
  id: string;
  name: string;
  description?: string;
  has_transaction: boolean;
  balance: number;
  unit: string;
}

export type {
  Asset,
  AssetResponse,
  CreateAssetPayload,
  UpdateAssetPayload,
  AssetHandlers,
  AssetBalance,
};
