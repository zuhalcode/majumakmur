"use client";

import { Loader, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { Prefix, useFetchPrefix } from "@/hooks/use-prefix";
import { useEffect } from "react";

import DashboardTable from "@/components/dashboard/dashboard-table";
import { Category, useFetchCategory } from "@/hooks/use-category";

const formSchema = z.object({
  name: z.string().min(1),
});

type Form = z.infer<typeof formSchema>;

export default function Page() {
  const { data, loading, error, refetch, insertData, deleteData } =
    useFetchCategory();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, control, setError } = form;

  const handleOnSubmit = handleSubmit(async ({ name }) => {
    try {
      const categoryData: Category = { name };

      await insertData(categoryData);

      refetch();
    } catch (err) {
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

  useEffect(() => {
    if (error) {
      setError("name", {
        type: "manual",
        message: error, // Memperbarui error di form
      });
    }
  }, [error, form]);

  const columns = [{ header: "Name", accessor: "name" }];

  return (
    <div className="w-full flex flex-col gap-5 px-10 mt-5 pb-10">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={handleOnSubmit}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
              >
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-2">
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={loading}
                            placeholder="Name"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
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
              data={data}
              handleOnDelete={handleOnDelete}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
