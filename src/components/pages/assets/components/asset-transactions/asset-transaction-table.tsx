import ActionCell from "@/components/dashboard/action-cell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssetTransaction } from "@/types/data/asset-transaction";
import React from "react";
import AssetTransactionDeleteDialog from "./asset-transaction-delete-dialog";

export default function AssetTransactionTable({
  transactions,
  handleDeleteAssetTransaction,
}: {
  transactions: AssetTransaction[];
  handleDeleteAssetTransaction: (id: string) => Promise<void>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Source Asset</TableHead>
          <TableHead>Source Qty</TableHead>
          <TableHead>Destination Asset</TableHead>
          <TableHead>Destination Qty</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((data, i) => (
          <TableRow key={data.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{data.source_asset?.name ?? "NULL"}</TableCell>
            <TableCell className="space-x-1">
              <span>{data.source_quantity ?? "NULL"}</span>
              <span className="uppercase">{data.source_asset?.unit}</span>
            </TableCell>

            <TableCell>{data.destination_asset?.name}</TableCell>

            <TableCell className="space-x-1">
              <span>{data.destination_quantity}</span>
              <span className="uppercase">{data.destination_asset?.unit}</span>
            </TableCell>

            <TableCell>{data.description ?? "-"}</TableCell>
            <TableCell>
              <AssetTransactionDeleteDialog
                id={data.id}
                onDelete={handleDeleteAssetTransaction}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
