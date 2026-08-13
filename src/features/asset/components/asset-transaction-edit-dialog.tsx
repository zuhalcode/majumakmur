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

import { Input } from "@/components/ui/input";
import { Loader, Pencil, Plus } from "lucide-react";

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

import { useEffect, useState } from "react";
import {
  AssetTransactionForm,
  assetTransactionFormSchema,
} from "@/features/asset/schemas/asset-transaction.schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AssetTransactionResponse,
  UpdateAssetTransactionDTO,
} from "@/features/asset/dto/asset-transaction.dto";
import { AssetTransactionHandlers } from "@/types/ui/dashboard/asset-transaction";
import { AssetResponse } from "@/features/asset/dto/asset.dto";

//#endregion

export default function AssetTransactionEditDialog({
  assets,
  transaction,
  loading,
  onEdit,
}: {
  assets: AssetResponse[];
  transaction: AssetTransactionResponse;
  loading: boolean;
  onEdit: AssetTransactionHandlers["update"];
}) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<AssetTransactionForm>({
    resolver: zodResolver(assetTransactionFormSchema),
    defaultValues: {
      id: "",
      source_asset_id: "none",
      source_quantity: "0",
      destination_asset_id: "none",
      destination_quantity: "0",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    const {
      source_asset_id,
      source_quantity,
      destination_asset_id,
      destination_quantity,
      description,
      date,
      id,
    } = values;

    if (!id) {
      throw new Error("Missing transaction id");
    }

    try {
      const assetTransactionData: UpdateAssetTransactionDTO = {
        id,
        source_asset_id:
          source_asset_id === "none" ? undefined : source_asset_id,
        destination_asset_id:
          destination_asset_id === "none" ? undefined : destination_asset_id,
        source_quantity: Number(source_quantity),
        destination_quantity: Number(destination_quantity),
        description,
        date,
      };

      await onEdit(assetTransactionData);
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
      id: transaction.id,
      source_asset_id: transaction.source_asset_id ?? "none",
      source_quantity: String(transaction.source_quantity ?? 0),
      destination_asset_id: transaction.destination_asset_id ?? "none",
      destination_quantity: String(transaction.destination_quantity ?? 0),
      description: transaction.description ?? "",
      date: transaction.date,
    });
  }, [open, transaction, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="warning" size="icon">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Asset Transaction</DialogTitle>
          <DialogDescription>Update field information below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleOnSubmit} className="space-y-1">
            {/* DATE */}
            <FormField
              control={control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="h-8 text-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* SOURCE ASSET */}
            <FormField
              control={control}
              name="source_asset_id"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Source Asset *</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="text-xs ">
                          <SelectValue placeholder="Select Source Asset" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-xs">None</span>
                        </SelectItem>
                        {assets?.map((asset) => (
                          <SelectItem key={asset.id} value={String(asset.id)}>
                            <span className="text-xs capitalize">
                              {asset.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* SOURCE QUANTITY */}
            <FormField
              control={control}
              name="source_quantity"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Source Quantity</FormLabel>
                    <FormControl className="text-xs h-8 placeholder:text-xs">
                      <Input
                        {...field}
                        type="number"
                        placeholder="Source Quantity"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* DESTINATION ASSET */}
            <FormField
              control={control}
              name="destination_asset_id"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">
                      Destination Asset *
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="text-xs placeholder:text-xs">
                          <SelectValue placeholder="Select Destination Asset" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-xs">None</span>
                        </SelectItem>
                        {assets?.map((asset) => (
                          <SelectItem key={asset.id} value={String(asset.id)}>
                            <span className="text-xs capitalize">
                              {asset.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* DESTINATION QUANTITY */}
            <FormField
              control={control}
              name="destination_quantity"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">
                      Destination Quantity *
                    </FormLabel>
                    <FormControl className="text-xs h-8 placeholder:text-xs">
                      <Input
                        {...field}
                        type="number"
                        placeholder="Destination Quantity"
                      />
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
