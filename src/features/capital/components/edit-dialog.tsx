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
import { Loader, Pencil } from "lucide-react";

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

import { CapitalResponse, UpdateCapitalDTO } from "../types/capital.dto";
import { EditCapitalForm, editCapitalFormSchema } from "../schemas/edit.schema";

//#endregion

interface Props {
  capital: CapitalResponse;
  loading: boolean;
  onUpdate: (dto: UpdateCapitalDTO) => Promise<void>;
}

export default function CapitalEditDialog({
  capital,
  loading,
  onUpdate,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<EditCapitalForm>({
    resolver: zodResolver(editCapitalFormSchema),
    defaultValues: {
      date: capital.date,
      capital: String(capital.capital),
      purchase: String(capital.purchase),
      sell: String(capital.sell),
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    try {
      const payload: UpdateCapitalDTO = {
        id: capital.id,
        date: values.date,
        capital: Number(values.capital),
        purchase: Number(values.purchase),
        sell: Number(values.sell),
      };

      await onUpdate(payload);
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
      date: capital.date,
      capital: String(capital.capital ?? 0),
      purchase: String(capital.purchase ?? 0),
      sell: String(capital.sell ?? 0),
    });
  }, [open, capital, form]);

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

            {/* CAPITAL */}
            <FormField
              control={control}
              name="capital"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Capital</FormLabel>
                    <FormControl className="text-xs h-8 placeholder:text-xs">
                      <Input {...field} type="number" placeholder="Capital" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* PURCHASE */}
            <FormField
              control={control}
              name="purchase"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Purchase</FormLabel>
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

            {/* SELL */}
            <FormField
              control={control}
              name="sell"
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
