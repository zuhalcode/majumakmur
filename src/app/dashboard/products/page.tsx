"use client";

import { useProductCategory } from "@/features/product-category/api/use-product-category";
import { useProduct } from "@/features/product/api/use-product";

import ProductManagementPage from "@/features/product/page";

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
