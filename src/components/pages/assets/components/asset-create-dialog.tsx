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

//#endregion

export default function AssetCreateDialog({
  onCreate,
}: {
  onCreate: (asset: Asset) => Promise<void>;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<AssetForm>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "",
      description: "",
      unit: "",
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    const { name, description, unit } = values;

    try {
      const assetData: Asset = {
        name: name,
        description: description,
        unit: unit,
      };

      await onCreate(assetData);
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
        <Button variant="secondary" size="lg" className="max-w-sm mx-auto">
          <Plus className="size-4" />
          <p className="">Add Card</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>
            Add a new asset card to your dashboard. Fill in the required
            information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleOnSubmit} className="space-y-3">
            <FormField
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Name" />
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

            <FormField
              control={control}
              name="unit"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>Unit *</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Unit" />
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
