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

import {
  ProductHandlers,
  ProductResponse,
  UpdateProductPayload,
} from "../product.types";
import {
  updateProductFormSchema,
  UpdateProductFormValues,
} from "../product.schema";
import CreateProductForm from "./form/create-product-form";
import UpdateProductForm from "./form/update-product-form";

//#endregion

interface Props {
  product: ProductResponse;
  loading?: boolean;
  onUpdate: ProductHandlers["update"];
}

export default function ProductEditDialog({
  product,
  loading,
  onUpdate,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="warning" size="icon">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <UpdateProductForm
          product={product}
          onUpdate={onUpdate}
          open={open}
          onOpenChange={setOpen}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
