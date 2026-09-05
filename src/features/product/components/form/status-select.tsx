import React from "react";
import { ProductStatus } from "../../product.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value?: ProductStatus;
  onChange: (value: ProductStatus) => void;
  disabled?: boolean;
}

const StatusSelect = ({ value, disabled, onChange }: Props) => {
  return (
    <Select
      disabled={disabled}
      value={value !== undefined ? String(value) : undefined}
      onValueChange={(value) => {
        onChange(String(value) as ProductStatus);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pilih karat" />
      </SelectTrigger>

      <SelectContent>
        {Object.values(ProductStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
