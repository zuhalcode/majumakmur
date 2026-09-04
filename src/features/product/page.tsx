"use client";

//#region-imports

import React from "react";

import { IntlProvider } from "react-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import ProductTable from "./components/table";
import { ProductHandlers } from "./product.types";

import { useProductCategory } from "../product-category/api/use-product-category";

import CreateProductForm from "./components/form/create-product-form";
import { useProduct } from "./use-product";

//#endregion

type PropsPage = {
  apiProduct: ReturnType<typeof useProduct>;
  apiProductCategory: ReturnType<typeof useProductCategory>;
};

const ProductManagementPage = ({
  apiProduct,
  apiProductCategory,
}: PropsPage) => {
  const {
    data: products,
    loading: loadingProduct,
    error: errorProduct,
    refetch,
    create: createProduct,
    update: updateProduct,
    remove: removeProduct,
  } = apiProduct;

  const {
    data: productCategories,
    loading: loadingProductCategory,
    error: errorProductCategory,
  } = apiProductCategory;

  const handleCreateProduct: ProductHandlers["create"] = async (payload) => {
    await createProduct(payload);
    await refetch();
  };

  const handleUpdateProduct: ProductHandlers["update"] = async (payload) => {
    await updateProduct(payload);
    await refetch();
  };

  const handleDeleteProduct = async (id: string) => {
    await removeProduct(id);
    await refetch();
  };

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-10 mt-5 pb-10">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>List Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Form */}
              <CreateProductForm
                categories={productCategories}
                loading={loadingProduct}
                onSubmit={handleCreateProduct}
              />

              <ProductTable
                products={products}
                loading={loadingProduct}
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
};

export default ProductManagementPage;
