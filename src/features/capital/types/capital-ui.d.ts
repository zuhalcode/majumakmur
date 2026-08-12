interface CapitalCardInfo {
  title: string;
  value: number;
  desc?: string;
  percent: number;
  active: boolean;
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

interface CapitalHandlers {
  create(dto: CreateCapitalDTO): Promise<void>;
  update(dto: UpdateCapitalDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

export type {
  CapitalCardInfo,
  CapitalFilters,
  CapitalSummary,
  CapitalHandlers,
};
