//#region-imports

import React from "react";
import { TrashHandlers, TrashItem, TrashResource } from "../trash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TrashRestoreDialog from "./restore-dialog";
import TrashDestroyDialog from "./destroy-dialog";
import { LoadingSpinner } from "@/components/loading";
import { Loader } from "lucide-react";

//#endregion

interface Props {
  trashItems: TrashItem[];
  loading: boolean;
  onRestore: TrashHandlers["restore"];
  onDestroy: TrashHandlers["destroy"];
}

const TrashTable = ({ trashItems, loading, onRestore, onDestroy }: Props) => {
  const formatDate = (value: string) =>
    new Date(value).toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Resource</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Deleted_At</TableHead>
          <TableHead>Deleted_By</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7}>
              <div className="w-full flex justify-center">
                <Loader className="animate-spin size-10" />
              </div>
            </TableCell>
          </TableRow>
        ) : (
          trashItems.map((data, i) => (
            <TableRow key={data.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{data.resource}</TableCell>
              <TableCell>{data.label ?? "-"}</TableCell>
              <TableCell>{data.description ?? "-"}</TableCell>
              <TableCell> {formatDate(data.deleted_at)}</TableCell>
              <TableCell className="capitalize">
                {data.deleted_by_name}
              </TableCell>

              <TableCell className="flex gap-1 items-center">
                <TrashRestoreDialog
                  id={data.id}
                  resource={data.resource as TrashResource}
                  onRestore={onRestore}
                />
                <TrashDestroyDialog
                  id={data.id}
                  resource={data.resource as TrashResource}
                  onDestroy={onDestroy}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TrashTable;
