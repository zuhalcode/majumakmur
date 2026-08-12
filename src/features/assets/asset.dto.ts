interface Asset {
  id: string;
  name: string;
  description?: string;
  unit: string;
}

type CreateAssetDTO = Omit<Asset, "id">;

type UpdateAssetDTO = Partial<CreateAssetDTO> & {
  id: string;
};

type AssetResponse = Asset;

export type { Asset, AssetResponse, CreateAssetDTO, UpdateAssetDTO };
