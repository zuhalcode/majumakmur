import { BUYBACK_REFERENCE_FACTOR } from "@/constants/dashboard.constant";
import { GoldPrice, GoldRate } from "@/types/data/dashboard";

export const calculateGoldPrices = (
  goldPrice: number,
  rates: GoldRate[],
): GoldPrice[] => {
  return rates.map((rate) => {
    const round = (value: number) => Math.round(value);
    const goldRefPrice = goldPrice * BUYBACK_REFERENCE_FACTOR;

    const exchangePrice = round(goldPrice * (rate.exchange / 100));
    const sellingPrice = round(
      exchangePrice + exchangePrice * (rate.margin / 100),
    );

    const buybackGood = round(goldRefPrice * rate.buyback_factor.good);

    const buybackRepair =
      rate.buyback_factor.repair !== undefined
        ? round(goldRefPrice * rate.buyback_factor.repair)
        : undefined;

    const buybackScrap =
      rate.buyback_factor.scrap !== undefined
        ? round(goldRefPrice * rate.buyback_factor.scrap)
        : undefined;

    return {
      ...rate,
      exchangePrice,
      sellingPrice,
      buybackGood,
      buybackRepair,
      buybackScrap,
    };
  });
};
