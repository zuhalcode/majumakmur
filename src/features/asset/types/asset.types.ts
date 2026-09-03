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

type AssetResponse = Asset;

interface AssetCardInfo {
  id: string;
  name: string;
  description?: string;
  balance: number;
  unit: string;
  active: boolean;
  percent: number;
}

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
  balance: number;
  unit: string;
}

export type {
  Asset,
  AssetCardInfo,
  AssetResponse,
  CreateAssetPayload,
  UpdateAssetPayload,
  AssetHandlers,
  AssetBalance,
};
