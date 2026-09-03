//#region-imports

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import KaratSelect from "./karat-select";
import { Input } from "@/components/ui/input";
import StatusSelect from "./status-select";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import {
  updateProductFormSchema,
  UpdateProductFormValues,
} from "../../product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductHandlers,
  ProductResponse,
  ProductStatus,
  UpdateProductPayload,
} from "../../product.types";
import { useEffect } from "react";
//#endregion

interface Props {
  product: ProductResponse;
  onUpdate: ProductHandlers["update"];
  loading?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getDefaultValues = (
  product: ProductResponse,
): UpdateProductFormValues => ({
  name: product.name ?? "",
  description: product.description ?? "",
  karat: product.karat,
  weight: product.weight,
  status: product.status,
});

const UpdateProductForm = ({
  open,
  product,
  onUpdate,
  onOpenChange,
  loading,
}: Props) => {
  const form = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductFormSchema),
    defaultValues: getDefaultValues(product),
  });

  const { control, handleSubmit } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    try {
      const payload: UpdateProductPayload = {
        id: product.id,
        karat: values.karat,
        name: values.name,
        description: values.description,
        weight: values.weight,
        status: values.status,
      };

      await onUpdate(payload);
      onOpenChange(false);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

  useEffect(() => {
    if (!open) return;
    form.reset(getDefaultValues(product));
  }, [open, product, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleOnSubmit}
        className="grid grid-cols-1 gap-4 items-end"
      >
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
                    value={field.value ?? ""}
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

        <Button className="w-32" type="submit" disabled={loading}>
          <Plus className="w-4 h-4" />
          {loading ? <Loader className="animate-spin" /> : "Update Data"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProductForm;
