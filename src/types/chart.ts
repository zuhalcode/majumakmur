export type CashFlow = {
  date: Date;
  cashFlow: number;
};

export type BuyAndSell = {
  date: Date;
  buy: number;
  sell: number;
};

export type AreaConfig = {
  dataKey: string;
  label: string;
  stroke?: string;
  fill?: string;
};
