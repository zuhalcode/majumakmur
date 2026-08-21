import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductForm } from "../../product.schema";
import { ProductCategoryResponse } from "@/features/product-category/product-category.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CategoryCodeSelect from "./category-code-select";
import KaratSelect from "./karat-select";
import { Input } from "@/components/ui/input";
import StatusSelect from "./status-select";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";

interface Props {
  form: UseFormReturn<ProductForm>;
  categories: ProductCategoryResponse[];
  onSubmit: (data: ProductForm) => Promise<void>;
  loading?: boolean;
}

const CreateProductForm = ({
  form,
  categories,
  onSubmit,
  loading = false,
}: Props) => {
  const { control, handleSubmit } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end"
      >
        {/* Category Code */}
        <FormField
          control={control}
          name="category_code"
          render={({ field }) => {
            return (
              <FormItem className="space-y-2 ">
                <FormLabel>Category Code</FormLabel>
                <FormControl>
                  <CategoryCodeSelect
                    categories={categories}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Karat */}
        <FormField
          control={control}
          name="karat"
          render={({ field }) => {
            return (
              <FormItem className="space-y-2 ">
                <FormLabel>Karat</FormLabel>
                <FormControl>
                  <KaratSelect
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Name */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="space-y-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Weight */}
        <FormField
          control={control}
          name="weight"
          render={({ field }) => {
            return (
              <FormItem className="">
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    type="number"
                    placeholder="Amount"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Status */}
        <FormField
          control={control}
          name="status"
          render={({ field }) => {
            return (
              <FormItem className="space-y-2 ">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <StatusSelect
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Image */}
        {/* <FormField
                    control={control}
                    name="image"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Image</FormLabel>

                          <FormControl className="cursor-pointer">
                            <Input
                              onChange={(e) => {
                                if (e.target.files) {
                                  field.onChange(e.target.files[0]);
                                }
                              }}
                              accept="image/*"
                              disabled={loading}
                              type="file"
                              placeholder="Image"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  /> */}

        <Button className="w-32" disabled={loading}>
          <Plus className="w-4 h-4" />
          {loading ? <Loader className="animate-spin" /> : "Insert Data"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
