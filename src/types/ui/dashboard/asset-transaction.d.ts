import {
  CreateAssetTransactionDTO,
  UpdateAssetTransactionDTO,
} from "@/types/dto/asset-transaction/asset-transaction.dto";

interface AssetTransactionHandlers {
  fetch: () => Promise<void>;
  create: (dto: CreateAssetTransactionDTO) => Promise<void>;
  update: (dto: UpdateAssetTransactionDTO) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export type { AssetTransactionHandlers };
