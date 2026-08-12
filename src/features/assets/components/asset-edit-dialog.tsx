//#region-imports

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AssetForm,
  assetFormSchema,
} from "@/features/assets/schemas/asset.schema";
import { AssetResponse, UpdateAssetDTO } from "@/features/assets/asset.dto";
import { AssetHandlers } from "@/features/assets/asset";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//#endregion

export default function AssetEditDialog({
  asset,
  loading,
  onEdit,
}: {
  asset: AssetResponse;
  loading: boolean;
  onEdit: AssetHandlers["update"];
}) {
  const { id } = asset;
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<AssetForm>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "none",
      description: "none",
      unit: "none",
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    const { name, unit, description } = values;

    try {
      const assetData: UpdateAssetDTO = {
        id,
        name: name === "none" ? undefined : name,
        unit: unit === "none" ? undefined : unit,
        description,
      };

      await onEdit(assetData);
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      form.reset();
      setOpen(false);
    }
  });

  useEffect(() => {
    if (!open) return;

    form.reset({
      name: asset.name ?? "none",
      unit: asset.unit ?? "none",
      description: asset.description ?? "",
    });
  }, [open, asset, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="warning" size="icon">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Asset Transaction</DialogTitle>
          <DialogDescription>
            Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleOnSubmit} className="space-y-1">
            {/* NAME */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Name</FormLabel>
                    <FormControl className="text-xs h-8 placeholder:text-xs">
                      <Input {...field} type="text" placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* NAME */}
            <FormField
              control={control}
              name="unit"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Unit</FormLabel>
                    <FormControl className="text-xs h-8 placeholder:text-xs">
                      <Input {...field} type="text" placeholder="Unit" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* DESCRIPTION */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Description</FormLabel>
                    <FormControl className="text-xs h-8 placeholder:text-xs">
                      <Input {...field} type="text" placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <DialogFooter className="pt-1">
              <DialogClose asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
