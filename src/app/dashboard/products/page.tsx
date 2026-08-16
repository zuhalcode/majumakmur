"use client";

import { useGold } from "@/features/gold/api/use-gold";
import { useProduct } from "@/features/product/api/use-product";

import ProductManagementPage from "@/features/product/page";

export default function Page() {
  const { data, refetch, createData } = useProduct();
  const { data: goldTypes } = useGold();

  return (
    <ProductManagementPage
      data={data}
      goldTypes={goldTypes}
      createData={createData}
      refetch={refetch}
    />
  );
}
