interface Product {
  code: string;
  name: string;
  weight: number;
  category_id?: string;
  categories?: { name: string };
  gold_type_id?: string;
  gold_types?: { karat: number };
  desc?: string;
  image_url?: string;
}

export type { Product };
