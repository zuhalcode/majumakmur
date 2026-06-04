import { Capital } from "./capital";

interface TaxReport {
  date: string;
  data: Capital[];

  totalPurchase: number;
  totalSell: number;

  grossProfit: number;
  netProfit: number;

  pph: number;
  ppn: number;
  zakat: number;
  invest20: number;
}

interface TaxSummary {
  totalPurchase: number;
  totalTaxPPh: number;
  monthLength: number;
}

export type { TaxReport, TaxSummary };
