import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import TableTooltip from "../table-tooltip";
import { PencilLine, Trash } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { TableCell } from "../ui/table";
import CustomAlertDialog from "../custom-alert-dialog";

type ActionCellProps = {
  id: number;
  handleOnDelete: (id: number) => void;
};

const ActionCell: React.FC<ActionCellProps> = ({ id, handleOnDelete }) => {
  return (
    <TableCell>
      <TooltipProvider>
        <div className="flex gap-2">
          <TableTooltip text="Edit Data" icon={<PencilLine />} />

          <CustomAlertDialog
            trigger={
              <TableTooltip
                text="Delete Data"
                icon={<Trash />}
                variant="destructive"
              />
            }
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                data with ID {id}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleOnDelete(id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </CustomAlertDialog>
        </div>
      </TooltipProvider>
    </TableCell>
  );
};

export default ActionCell;
