interface Product {
  code: string;
  category_id?: string;
  categories?: { name: string };
  gold_type_id?: string;
  gold_types?: { karat: number };
  name: string;
  desc: string;
  weight: number;
}

export type { Product };
