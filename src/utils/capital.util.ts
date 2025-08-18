import { Capital } from "@/types/dashboard";

interface CapitalSummary {
  totalPurchase: number;
  totalSell: number;
  totalCashFlow: number;
  purchaseDays: number;
  lastDateAfter1Year: string;
}

export function capitalSummary(data: Capital[]): CapitalSummary {
  if (!data || data.length === 0) {
    return {
      totalPurchase: 0,
      totalSell: 0,
      totalCashFlow: 0,
      purchaseDays: 0,
      lastDateAfter1Year: "",
    };
  }

  const { totalPurchase, totalSell } = data.reduce(
    (totals, item) => {
      totals.totalPurchase += item.purchase;
      totals.totalSell += item.sell;
      return totals;
    },
    { totalPurchase: 0, totalSell: 0 }
  );

  const totalCashFlow = data.reduce(
    (total, item) => total + (item.purchase - item.sell),
    0
  );

  const DAY = 1000 * 60 * 60 * 24;
  const lastPurchaseDay = new Date(data[0]?.date).getTime();
  const firstPurchaseDay = new Date(data[data.length - 1]?.date).getTime();

  const purchaseDays = (lastPurchaseDay - firstPurchaseDay) / DAY;

  const lastDateAfter1Year = new Date(
    new Date(data[data.length - 1]?.date).setFullYear(
      new Date(data[data.length - 1]?.date).getFullYear() + 1
    )
  ).toLocaleDateString("en-GB");

  return {
    totalPurchase,
    totalSell,
    totalCashFlow,
    purchaseDays,
    lastDateAfter1Year,
  };
}
