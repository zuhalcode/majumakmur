export enum ProductStatus {
  DISPLAY = "display",
  WAREHOUSE = "warehouse",
  REPAIR = "repair",
  MELT = "melt",
}

type Karat = 6 | 8 | 16;

interface ProductResponse {
  id: string;
  code: string;
  karat: Karat;
  name: string | null;
  description: string | null;
  weight: number;
  status: ProductStatus;
  created_at: string;
}

interface ProductOwnerResponse extends ProductResponse {
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
}

interface CreateProductPayload {
  category_code: string;
  karat: Karat;
  name: string;
  description?: string;
  weight: number;
  image?: Blob;
  status: ProductStatus;
}

interface UpdateProductPayload {
  karat?: Karat;
  name?: string;
  description?: string;
  weight?: number;
  status?: ProductStatus;
}

interface ProductHandlers {
  create(payload: CreateProductPayload): Promise<void>;
  update(payload: UpdateProductPayload): Promise<void>;
  delete(id: string): Promise<void>;
}

export type {
  ProductResponse,
  ProductOwnerResponse,
  CreateProductPayload,
  Karat,
  ProductHandlers,
};
