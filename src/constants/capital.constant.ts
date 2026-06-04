import { CapitalFilters } from "@/types/data/capital";

export const DEFAULT_CAPITAL_FILTERS: CapitalFilters = {
  year: 0,
  month: 0,
};

export const TODAY = new Date().toISOString().split("T")[0];

export const YEARS = [2026, 2025, 2024];
export const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
