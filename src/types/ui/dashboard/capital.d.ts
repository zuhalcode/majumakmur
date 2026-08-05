interface CapitalCardInfo {
  title: string;
  value: number;
  desc?: string;
  percent: number;
  active: boolean;
}

interface CashFlow {
  date: Date;
  cashFlow: number;
}

interface BuyAndSell {
  date: Date;
  buy: number;
  sell: number;
}

interface ColumnConfig {
  header: string;
  accessor: string;
  type: "date" | "number" | "string";
  format?: "MM/YY" | "DD/MM/YYYY";
}

export type { CapitalCardInfo, CashFlow, BuyAndSell, AreaConfig, ColumnConfig };
