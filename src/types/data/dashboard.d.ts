interface GoldRate {
  karat: number;
  exchange: number;
  melt: number;
  color: string;
  margin: number;

  buyback_factor: {
    good: number;
    repair?: number;
    scrap?: number;
  };
}

export interface GoldPrice extends GoldRate {
  exchangePrice: number;
  sellingPrice: number;
  buybackGood: number;
  buybackRepair?: number;
  buybackScrap?: number;
}

export type { GoldRate, GoldPrice };
