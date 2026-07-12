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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssetForm, assetFormSchema } from "@/schemas/asset.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Asset } from "@/types/data/asset";
import { useState } from "react";
import { CardTitle } from "@/components/ui/card";
import {
  AssetTransactionForm,
  assetTransactionFormSchema,
} from "@/schemas/asset-transaction.schema";
import { AssetTransaction } from "@/types/dto/asset-transaction/asset-transaction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//#endregion

export default function AssetTransactionCreateDialog({
  onCreate,
  assets,
}: {
  assets?: Asset[];
  onCreate: (transaction: AssetTransaction) => Promise<void>;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<AssetTransactionForm>({
    resolver: zodResolver(assetTransactionFormSchema),
    defaultValues: {
      source_asset_id: "",
      source_quantity: "",
      destination_asset_id: "",
      destination_quantity: "",
      description: "",
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
    } = values;

    try {
      const assetTransactionData: AssetTransaction = {
        source_asset_id: source_asset_id ?? null,
        destination_asset_id: destination_asset_id ?? null,
        source_quantity: Number(source_quantity),
        destination_quantity: Number(destination_quantity),
        description,
      };

      await onCreate(assetTransactionData);
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      form.reset();
      setOpen(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="">
          <Plus className="size-4" />
          <p className="">Add New Transaction</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Asset Transaction</DialogTitle>
          <DialogDescription>
            Add a new asset's transaction to your dashboard. Fill in the
            required information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleOnSubmit} className="space-y-3">
            <FormField
              control={control}
              name="source_asset_id"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>Source Asset *</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Source Asset" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {assets?.map((asset) => (
                          <SelectItem key={asset.id} value={String(asset.id)}>
                            {asset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="source_quantity"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>Source Quantity</FormLabel>
                    <FormControl>
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

            <FormField
              control={control}
              name="destination_asset_id"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>Destination Asset *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Destination Asset" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {assets?.map((asset) => (
                          <SelectItem key={asset.id} value={String(asset.id)}>
                            {asset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="destination_quantity"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>Destination Quantity *</FormLabel>
                    <FormControl>
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
            <FormField
              control={control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
