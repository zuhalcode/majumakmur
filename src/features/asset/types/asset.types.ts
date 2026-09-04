interface AssetResponse {
  id: string;
  name: string;
  description?: string;
  unit: string;
}

type CreateAssetPayload = Omit<AssetResponse, "id">;
type UpdateAssetPayload = Partial<Omit<AssetResponse, "id">> & { id: string };

interface AssetBalance extends AssetResponse {
  value: number;
  has_transaction: boolean;
}

interface AssetHandlers {
  fetch: () => Promise<void>;
  create: (payload: CreateAssetPayload) => Promise<void>;
  update: (payload: UpdateAssetPayload) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export type {
  AssetResponse,
  CreateAssetPayload,
  UpdateAssetPayload,
  AssetHandlers,
  AssetBalance,
};
