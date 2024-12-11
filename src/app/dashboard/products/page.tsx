"use client";

import { Loader, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IntlProvider } from "react-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFetchDailyTransaction } from "@/hooks/use-daily-transaction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchCategory } from "@/hooks/use-category";
import { useFetchPrefix } from "@/hooks/use-prefix";
import { useFetchGoldType } from "@/hooks/use-gold-type";
import { Product, useFetchProduct } from "@/hooks/useProduct";
import DashboardTable from "@/components/dashboard/dashboard-table";

const formSchema = z.object({
  code: z.string(),
  category: z.string(),
  gold_type: z.string().min(1),
  name: z.string().min(1),
  desc: z.string().min(1).optional(),
  weight: z.string(),
  status: z.string(),
});

type Form = z.infer<typeof formSchema>;

export default function Page() {
  const { data, loading, refetch, insertData, deleteData } = useFetchProduct();

  const { data: categories } = useFetchCategory();
  const { data: prefixes } = useFetchPrefix();
  const { data: goldTypes } = useFetchGoldType();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "CC",
      category: "",
      gold_type: "",
      name: "",
      desc: "",
      weight: "",
      status: "active",
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async ({ code, name, desc, weight }) => {
    try {
      const productData: Product = {
        code,
        name,
        desc: desc!,
        category_id: "2",
        gold_type_id: "5",
        weight: Number(weight),
      };

      await insertData(productData);

      refetch();
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
      await deleteData(id);
      refetch();
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
            <CardTitle>List Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={handleOnSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end"
                >
                  <FormField
                    control={control}
                    name="code"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
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

                  <FormField
                    control={control}
                    name="weight"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
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

              <DashboardTable
                columns={columns}
                data={dataRestructured}
                handleOnDelete={handleOnDelete}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
}
