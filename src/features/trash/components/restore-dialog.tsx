//#region-imports

import { Button } from "@/components/ui/button";

import { Recycle, Trash } from "lucide-react";

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
import { TrashHandlers, TrashResource } from "../trash";

//#endregion

export default function TrashRestoreDialog({
  id,
  resource,
  onRestore,
}: {
  id: string;
  resource: TrashResource;
  onRestore: TrashHandlers["restore"];
}) {
  const handleOnClick = async () => {
    try {
      await onRestore(resource, id);
    } catch (error) {
      console.error("Error Restoring data:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="warning" size="icon">
          <Recycle className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will restore {resource} with id {id} from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOnClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
