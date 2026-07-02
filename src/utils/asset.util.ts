import { Asset, AssetSummary } from "@/types/data/asset";

export function assetSummary(data: Asset[]): AssetSummary {
  console.log(data);

  if (!data || data.length === 0) {
    return {
      gold: 0,
      capitalCash: 0,
      personalCash: 0,
    };
  }

  return {
    gold: 0,
    capitalCash: 0,
    personalCash: 0,
  };
}

export function formatAssetValue(value: number, unit: string) {
  switch (unit.toUpperCase()) {
    case "IDR":
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(value);

    case "GRAM":
      return `${value} g`;

    case "PERCENT":
      return `${value}%`;

    default:
      return `${value} ${unit}`;
  }
}
