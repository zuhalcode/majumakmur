import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { CapitalResponse, UpdateCapitalDTO } from "../types/capital.dto";
import CapitalEditDialog from "./edit-dialog";
import { FormattedNumber } from "react-intl";
import { CapitalHandlers } from "../types/capital-ui";
import CapitalDeleteDialog from "./delete-dialog";

interface Props {
  capitals: CapitalResponse[];
  loading: boolean;
  onUpdate: CapitalHandlers["update"];
  onDelete: CapitalHandlers["delete"];
}

export default function CapitalTable({
  capitals,
  loading,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Capital</TableHead>
          <TableHead>Purchase</TableHead>
          <TableHead>Sell</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {capitals.map((data, i) => (
          <TableRow key={data.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{data.date}</TableCell>
            <TableCell>
              <FormattedNumber
                value={data.capital}
                style="currency"
                currency="IDR"
                minimumFractionDigits={0}
              />
            </TableCell>
            <TableCell>
              <FormattedNumber
                value={data.purchase}
                style="currency"
                currency="IDR"
                minimumFractionDigits={0}
              />
            </TableCell>
            <TableCell>
              <FormattedNumber
                value={data.sell}
                style="currency"
                currency="IDR"
                minimumFractionDigits={0}
              />
            </TableCell>

            <TableCell className="space-x-1">
              <CapitalEditDialog
                capital={data}
                loading={loading}
                onUpdate={onUpdate}
              />

              <CapitalDeleteDialog onDelete={onDelete} id={data.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
