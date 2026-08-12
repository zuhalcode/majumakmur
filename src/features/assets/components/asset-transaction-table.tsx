//#region-imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssetTransactionResponse } from "@/types/dto/asset-transaction/asset-transaction.dto";
import React from "react";
import AssetTransactionDeleteDialog from "./asset-transaction-delete-dialog";
import AssetTransactionEditDialog from "./asset-transaction-edit-dialog";

import { AssetTransactionHandlers } from "@/types/ui/dashboard/asset-transaction";

import { AssetResponse } from "@/features/assets/asset.dto";
//#endregion

export default function AssetTransactionTable({
  assets,
  transactions,
  loading,
  handleUpdateAssetTransaction,
  handleDeleteAssetTransaction,
}: {
  assets: AssetResponse[];
  transactions: AssetTransactionResponse[];
  loading: boolean;
  handleDeleteAssetTransaction: AssetTransactionHandlers["delete"];
  handleUpdateAssetTransaction: AssetTransactionHandlers["update"];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Src Asset</TableHead>
          <TableHead>Src Qty</TableHead>
          <TableHead>Dest Asset</TableHead>
          <TableHead>Dest Qty</TableHead>
          <TableHead>Desc</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((data, i) => (
          <TableRow key={data.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{data.date}</TableCell>
            <TableCell>{data.source_asset?.name ?? "NULL"}</TableCell>
            <TableCell className="space-x-1">
              <span>{data.source_quantity ?? "NULL"}</span>
              <span className="uppercase">{data.source_asset?.unit}</span>
            </TableCell>

            <TableCell className="capitalize">
              {data.destination_asset?.name}
            </TableCell>

            <TableCell className="space-x-1">
              <span>{data.destination_quantity}</span>
              <span className="uppercase">{data.destination_asset?.unit}</span>
            </TableCell>

            <TableCell>{data.description ?? "-"}</TableCell>

            <TableCell className="space-x-1">
              <AssetTransactionEditDialog
                assets={assets}
                transaction={data}
                loading={loading}
                onEdit={handleUpdateAssetTransaction}
              />
              <AssetTransactionDeleteDialog
                id={data.id}
                loading={loading}
                onDelete={handleDeleteAssetTransaction}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
