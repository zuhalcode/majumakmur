import React from "react";
import { ProductStatus } from "../../product.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCategoryResponse } from "@/features/product-category/product-category.types";

interface Props {
  value?: ProductCategoryResponse["code"];
  categories: ProductCategoryResponse[];
  onChange: (value: ProductCategoryResponse["code"]) => void;
  disabled?: boolean;
}

const CategoryCodeSelect = ({
  value,
  categories,
  disabled,
  onChange,
}: Props) => {
  return (
    <Select
      disabled={disabled}
      value={value !== undefined ? String(value) : undefined}
      onValueChange={(value) => {
        onChange(String(value) as ProductStatus);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pilih Category Code" />
      </SelectTrigger>

      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.code} value={category.code}>
            {category.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryCodeSelect;
