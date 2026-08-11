type TrashResource = "capital" | "asset" | "asset_transaction" | "product";

type TrashItem = {
  id: string;
  resource: string;
  label: string;
  description: string | null;
  deleted_at: string;
  deleted_by: string;
  deleted_by_name: string;
};

interface TrashHandlers {
  restore(resource: TrashResource, id: string): Promise<void>;
  destroy(resource: TrashResource, id: string): Promise<void>;
}

export type { TrashResource, TrashItem, TrashHandlers };
