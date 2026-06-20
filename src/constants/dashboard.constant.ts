import { GoldRate } from "@/types/data/dashboard";

export const BUYBACK_REFERENCE_FACTOR = 0.95;

export const GOLD_RATES: GoldRate[] = [
  {
    karat: 16,
    exchange: 68,
    melt: 65,
    color: "#F5C541",
    margin: 0,
    buyback_factor: { good: 0.6, repair: 0.6, scrap: 0.6 },
  },
  {
    karat: 9,
    exchange: 49,
    melt: 38,
    color: "#F9D44D",
    margin: 0,
    buyback_factor: { good: 0.49, repair: 0.4, scrap: 0.38 },
  },
  {
    karat: 8,
    exchange: 43,
    melt: 34,
    color: "#F1C14B",
    margin: 9,
    buyback_factor: { good: 0.43, repair: 0.36, scrap: 0.34 },
  },
  {
    karat: 6,
    exchange: 36,
    melt: 26,
    color: "#D0A25C",
    margin: 12,
    buyback_factor: { good: 0.34, repair: 0.28, scrap: 0.26 },
  },
];

export const SECTIONS = [
  {
    title: "Harga Jual",
    field: "sellingPrice",
  },
  {
    title: "Grosir",
    field: "exchangePrice",
  },
  {
    title: "Buyback Bagus",
    field: "buybackGood",
  },
  {
    title: "Buyback Servis",
    field: "buybackRepair",
  },
  {
    title: "Buyback Lebur",
    field: "buybackScrap",
  },
] as const;
