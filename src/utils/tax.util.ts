import { Capital } from "@/types/data/capital";
import { TaxReport, TaxSummary } from "@/types/data/tax";

export const buildTaxReport = (data: Capital[], year?: number): TaxReport[] => {
  const filteredData =
    !year || year === 0
      ? data
      : data.filter((item) => new Date(item.date).getFullYear() === year);

  const grouped = new Map<string, TaxReport>();

  filteredData.forEach((item) => {
    const key = new Date(item.date).toLocaleString("default", {
      month: "2-digit",
      year: "2-digit",
    });

    if (!grouped.has(key)) {
      grouped.set(key, {
        date: key,

        totalPurchase: 0,
        totalSell: 0,

        grossProfit: 0,

        pph: 0,
        ppn: 0,
        zakat: 0,

        netProfit: 0,
        invest20: 0,

        data: [],
      });
    }

    const row = grouped.get(key)!;

    row.data.push(item);
    row.totalPurchase += item.purchase;
    row.totalSell += item.sell;
  });

  return [...grouped.values()].map((row) => {
    const grossProfit = row.totalPurchase - row.totalSell;

    const pph = calculatePPH(row.totalPurchase);

    const ppn = calculatePPN(row.totalPurchase);

    const netProfit = grossProfit > 0 ? grossProfit - ppn : 0;

    const invest20 = netProfit > 0 ? netProfit * 0.2 : 0;

    const zakat = netProfit > 0 ? calculateZakat(netProfit - invest20) : 0;

    return {
      ...row,
      grossProfit,
      pph,
      ppn,
      zakat,
      netProfit,
      invest20,
    };
  });
};

export const buildTaxSummary = (reports: TaxReport[]): TaxSummary => {
  const totalPurchase = reports.reduce(
    (acc, row) => acc + row.totalPurchase,
    0,
  );

  return {
    totalPurchase,

    totalTaxPPh:
      totalPurchase > 1_000_000_000 ? (totalPurchase - 500_000_000) * 0.005 : 0,

    monthLength: reports.length,
  };
};

export const calculateZakat = (netProfit: number): number => {
  if (netProfit <= 0) return 0;
  return netProfit * 0.025;
};

export const calculatePPH = (purchase: number): number => {
  return purchase * 0.005;
};

export const calculatePPN = (purchase: number): number => {
  return purchase * 0.01;
};
