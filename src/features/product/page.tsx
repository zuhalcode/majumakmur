"use client";

//#region-imports

import React, { useState } from "react";

import { IntlProvider } from "react-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { Input } from "../../components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Loader, Plus } from "lucide-react";

import api from "@/lib/axios";
import axios from "axios";
import env from "@/config/env";
import {
  createProductFormSchema,
  ProductForm,
} from "@/features/product/product.schema";
import ProductTable from "./components/table";
import {
  CreateProductPayload,
  Karat,
  ProductHandlers,
  ProductResponse,
  ProductStatus,
} from "./product.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCategoryResponse } from "../product-category/product-category.types";
import { useProduct } from "./api/use-product";
import { useProductCategory } from "../product-category/api/use-product-category";
import KaratSelect from "./components/form/karat-select";
import StatusSelect from "./components/form/status-select";
import CategoryCodeSelect from "./components/form/category-code-select";
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
    createData: createProduct,
  } = apiProduct;

  const {
    data: productCategories,
    loading: loadingProductCategory,
    error: errorProductCategory,
  } = apiProductCategory;

  const form = useForm<ProductForm>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      category_code: "CC",
      name: "",
      weight: 0,
      status: ProductStatus.WAREHOUSE,
      // image: undefined,
    },
  });

  const handleCreateProduct: ProductHandlers["create"] = async (payload) => {
    await createProduct(payload);
    await refetch();
  };

  const handleOnDelete = async (id: number | undefined) => {
    if (!id) {
      console.error("ID is not Valid");
      return;
    }

    try {
      //   await deleteData(id);
      //   refetch();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
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
              {/* Form */}

              <ProductTable products={products} />
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
};

export default ProductManagementPage;
