interface Product {
  id?: number;
  code: string;
  name: string;
  weight: number;
  gold_types: { karat: number } | null;
  desc: string;
  profit?: number;
  status?: string;
  image_url?: string;
}

export type { Product };
