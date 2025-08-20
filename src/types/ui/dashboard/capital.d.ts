interface Capital {
  id?: number;
  capital: number;
  purchase: number;
  sell: number;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface CardInfo {
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
}

export type {
  CardInfo,
  CashFlow,
  BuyAndSell,
  AreaConfig,
  ColumnConfig,
  Capital,
};
