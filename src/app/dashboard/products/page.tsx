"use client";

import { useProductCategory } from "@/features/product-category/api/use-product-category";

import ProductManagementPage from "@/features/product/page";
import { useProduct } from "@/features/product/use-product";

export default function Page() {
  const apiProduct = useProduct();
  const apiProductCategory = useProductCategory();

  return (
    <ProductManagementPage
      apiProduct={apiProduct}
      apiProductCategory={apiProductCategory}
    />
  );
}
