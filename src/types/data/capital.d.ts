interface Capital {
  id?: number;
  capital: number;
  purchase: number;
  sell: number;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface CapitalFilters {
  year?: number;
  month?: number;
}

interface CapitalSummary {
  totalPurchase: number;
  totalSell: number;
  totalCashFlow: number;
  purchaseDays: number;
  lastDateAfter1Year: string;
}

export type { Capital, CapitalFilters, CapitalSummary };
