//#region-imports

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductHandlers, ProductResponse } from "../product.types";

import ProductEditDialog from "./edit-dialog";
import { SkeletonTable } from "@/components/skeleton/skeleton-table";

//#endregion

interface Props {
  products: ProductResponse[];
  loading?: boolean;
  onUpdate: ProductHandlers["update"];
  onDelete?: ProductHandlers["delete"];
}

export default function ProductTable({
  products,
  loading,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Desription</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <SkeletonTable />
        ) : (
          products.map((data, i) => (
            <TableRow key={data.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{data.code}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.description}</TableCell>
              <TableCell>{data.weight}</TableCell>
              <TableCell>{data.status}</TableCell>

              <TableCell className="space-x-1">
                <ProductEditDialog
                  product={data}
                  loading={loading}
                  onUpdate={onUpdate}
                />

                {/* <ProductDeleteDialog onDelete={onDelete} id={data.id} /> */}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
