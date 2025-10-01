"use client";

import { useFetchCategory } from "@/hooks/use-category";
import { useFetchPrefix } from "@/hooks/use-prefix";
import { useFetchGoldType } from "@/hooks/use-gold-type";
import { useProductAPI } from "@/hooks/use-product-api";

import ProductManagementPage from "@/components/pages/product-page";

export default function Page() {
  const { data, refetch, createData } = useProductAPI();

  const { data: prefixes } = useFetchPrefix();
  const { data: goldTypes } = useFetchGoldType();

  return (
    <ProductManagementPage
      data={data}
      prefixes={prefixes}
      goldTypes={goldTypes}
      createData={createData}
      refetch={refetch}
    />
  );
}
