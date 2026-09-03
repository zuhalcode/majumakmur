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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProductFormSchema,
  CreateProductFormValues,
} from "@/features/product/product.schema";
import ProductTable from "./components/table";
import { ProductHandlers, ProductStatus } from "./product.types";

import { useProduct } from "./api/use-product";
import { useProductCategory } from "../product-category/api/use-product-category";

import CreateProductForm from "./components/form/create-product-form";

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

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      category_code: "CC",
      name: "",
      description: "",
      karat: 8,
      weight: 0,
      status: ProductStatus.WAREHOUSE,
      // image: undefined,
    },
  });

  const handleCreateProduct: ProductHandlers["create"] = async (payload) => {
    await createProduct(payload);
    await refetch();
    form.reset();
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
                form={form}
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
