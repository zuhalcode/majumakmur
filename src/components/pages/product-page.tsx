"use client";

import React from "react";
import { IntlProvider } from "react-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Category } from "@/types/data/category";
import { Prefix } from "@/types/data/prefix";
import { Gold } from "@/types/data/gold";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/types/data/product";
import { Button } from "../ui/button";
import { Loader, Plus } from "lucide-react";

import DashboardTable from "../dashboard/dashboard-table";
import { productService } from "@/services/product.service";

const ProductManagementPage = ({
  data,
  loading,
  prefixes,
  categories,
  goldTypes,
}: {
  loading: boolean;
  categories: Category[];
  prefixes: Prefix[];
  goldTypes: Gold[];
  data: Product[];
}) => {
  const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only .jpg, .png, .webp formats are supported.",
      }
    );

  const formSchema = z.object({
    code: z.string(),
    category: z.string(),
    gold_type: z.string().min(1),
    name: z.string().min(1),
    desc: z.string().min(1).optional(),
    weight: z.string(),
    image: fileSchema,
    status: z.string(),
  });

  type Form = z.infer<typeof formSchema>;

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "CC",
      category: "",
      gold_type: "",
      name: "",
      desc: "",
      weight: "",
      image: undefined,
      status: "active",
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (data: Form) => {
    const formData = new FormData();

    formData.append("code", data.code);
    formData.append("category_id", data.category);
    formData.append("gold_type_id", data.gold_type);
    formData.append("name", data.name);
    formData.append("desc", data.desc || "");
    formData.append("weight", data.weight);
    formData.append("status", data.status);

    if (data.image) formData.append("image", data.image);
    console.log("INI data mentah : ", formData);

    try {
      const res = await productService.create(formData);
      console.log("Response: ", res);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

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

  const dataRestructured = data.map(
    ({ category_id, categories, gold_types, gold_type_id, ...rest }) => ({
      ...rest,
      category: categories?.name,
      karat: `${gold_types?.karat}K`,
    })
  );

  const columns = [
    { header: "Code", accessor: "code" },
    { header: "Category", accessor: "category" },
    { header: "Name", accessor: "name" },
    { header: "Karat", accessor: "karat" },
    { header: "Weight", accessor: "weight" },
    { header: "Description", accessor: "desc" },
    { header: "Profit", accessor: "profit" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-10 mt-5 pb-10">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>List Productssss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={handleOnSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end"
                >
                  {/* Code */}
                  <FormField
                    control={control}
                    name="code"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2 ">
                          <FormLabel>Code</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={loading}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a code" />
                              </SelectTrigger>
                              <SelectContent>
                                {prefixes.map(({ id, code }) => (
                                  <SelectItem
                                    key={id}
                                    value={code}
                                    className="capitalize"
                                  >
                                    {code}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Category */}
                  <FormField
                    control={control}
                    name="category"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={loading}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(({ id, name }) => (
                                  <SelectItem
                                    key={id}
                                    value={id!.toString()}
                                    className="capitalize"
                                  >
                                    {name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Gold Type */}
                  <FormField
                    control={control}
                    name="gold_type"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Gold Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={loading}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {goldTypes.map(({ id, karat }) => (
                                  <SelectItem
                                    key={id}
                                    value={id!.toString()}
                                    className="capitalize"
                                  >
                                    {karat}K
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                            <Input
                              {...field}
                              disabled={loading}
                              placeholder="Name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Description */}
                  <FormField
                    control={control}
                    name="desc"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              placeholder="description"
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

                  {/* Image */}
                  <FormField
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
                  />

                  <Button className="w-32" disabled={loading}>
                    <Plus className="w-4 h-4" />
                    {loading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Insert Data"
                    )}
                  </Button>
                </form>
              </Form>
              {/* Form */}

              {/* <DashboardTable
                columns={columns}
                data={dataRestructured}
                handleOnDelete={handleOnDelete}
              /> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
};

export default ProductManagementPage;
