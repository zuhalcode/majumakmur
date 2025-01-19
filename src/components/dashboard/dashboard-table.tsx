"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionCell from "./action-cell";

type Column = {
  header: string;
  accessor: string;
  type: string;
};

type RowData = {
  [key: string]: any;
};

type DashboardTableProps = {
  columns: Column[];
  data: RowData[];
  handleOnDelete?: (id: number) => void;
  handleOnEdit?: (id: number, updatedData: Record<string, any>) => void;
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  columns,
  data,
  handleOnDelete,
  handleOnEdit,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">No</TableHead>
          {columns.map((column, index) => (
            <TableHead className="text-center" key={index}>
              {column.header}
            </TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow className="text-center" key={rowIndex}>
            <TableCell>{rowIndex + 1}</TableCell>

            {columns.map((column, columnIndex) => (
              <TableCell key={columnIndex}>{row[column.accessor]}</TableCell>
            ))}

            <ActionCell
              id={row.id}
              editFormSchema={columns}
              data={row}
              handleOnDelete={handleOnDelete!}
              handleOnEdit={handleOnEdit!}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
