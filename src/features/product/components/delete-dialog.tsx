//#region-imports

import { Button } from "@/components/ui/button";

import { Trash } from "lucide-react";

import { ProductHandlers, ProductResponse } from "../product.types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

//#endregion

interface Props {
  product: ProductResponse;
  onDelete: ProductHandlers["delete"];
}

export default function ProductDeleteDialog({ product, onDelete }: Props) {
  const handleOnDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete asset with id{" "}
            {product.id} from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleOnDelete(product.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
