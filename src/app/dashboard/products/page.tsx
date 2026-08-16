"use client";

import { useProduct } from "@/features/product/api/use-product";

import ProductManagementPage from "@/features/product/page";

export default function Page() {
  const { data, refetch, createData } = useProduct();

  return (
    <ProductManagementPage
      data={data}
      createData={createData}
      refetch={refetch}
    />
  );
}
