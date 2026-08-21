import React from "react";
import { Karat } from "../../product.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value?: Karat;
  onChange: (value: Karat) => void;
  disabled?: boolean;
}

const KaratSelect = ({ value, disabled, onChange }: Props) => {
  return (
    <Select
      disabled={disabled}
      value={value !== undefined ? String(value) : undefined}
      onValueChange={(value) => {
        onChange(Number(value) as Karat);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pilih karat" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="6">6K</SelectItem>
        <SelectItem value="8">8K</SelectItem>
        <SelectItem value="16">16K</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default KaratSelect;
