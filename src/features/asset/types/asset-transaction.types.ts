import {
  CreateAssetTransactionDTO,
  UpdateAssetTransactionDTO,
} from "@/features/asset/dto/asset-transaction.dto";

interface AssetTransactionHandlers {
  fetch: () => Promise<void>;
  create: (dto: CreateAssetTransactionDTO) => Promise<void>;
  update: (dto: UpdateAssetTransactionDTO) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export type { AssetTransactionHandlers };
