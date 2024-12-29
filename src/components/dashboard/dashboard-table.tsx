import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "../ui/tooltip";
import TableTooltip from "../table-tooltip";
import { PencilLine, Trash } from "lucide-react";
import ActionCell from "./action-cell";
import { ScrollArea } from "../ui/scroll-area";

type Column = {
  header: string; // Nama header kolom
  accessor: string; // Kunci data yang akan ditampilkan di kolom tersebut
};

type RowData = {
  [key: string]: any; // Data untuk tiap row, kunci akan sesuai dengan `accessor` di Column
};

type DashboardTableProps = {
  columns: Column[]; // Kolom yang akan digunakan di header tabel
  data: RowData[]; // Data untuk baris tabel
  handleOnDelete?: (id: number) => void; // Fungsi untuk delete
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  columns,
  data,
  handleOnDelete,
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
            <ActionCell id={row.id} handleOnDelete={handleOnDelete!} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
