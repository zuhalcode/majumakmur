"use client";

import { useFetchCategory } from "@/hooks/use-category";
import { useFetchPrefix } from "@/hooks/use-prefix";
import { useFetchGoldType } from "@/hooks/use-gold-type";
import { useFetchProduct } from "@/hooks/useProduct";

import ProductManagementPage from "@/components/pages/product-page";

export default function Page() {
  const { data, loading, refetch, insertData, deleteData } = useFetchProduct();

  const { data: categories } = useFetchCategory();
  const { data: prefixes } = useFetchPrefix();
  const { data: goldTypes } = useFetchGoldType();

  return (
    <ProductManagementPage
      data={data}
      loading={loading}
      prefixes={prefixes}
      categories={categories}
      goldTypes={goldTypes}
    />
  );
}
