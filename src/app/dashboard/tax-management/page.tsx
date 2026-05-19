"use client";

import { useCapitalAPI } from "@/hooks/use-capital-api";
import TaxManagementPage from "@/components/pages/tax-page";
import { CardInfo, ColumnConfig } from "@/types/ui/dashboard/capital";

export default function Page() {
  const { dataByMonth, loading } = useCapitalAPI();

  const monthLength = dataByMonth.length;

  const totalPurchase = dataByMonth.reduce(
    (total, item) => total + item.totalPurchase,
    0,
  );

  const cardInfos: CardInfo[] = [
    {
      title: "Total Purchase",
      value: totalPurchase,
      desc: `From last ${monthLength} Months`,
      percent: 0,
      active: false,
    },
    {
      title: "Total Tax PPh",
      value:
        totalPurchase > 1000000000 ? (totalPurchase - 500000000) * 0.005 : 0,
      desc: `From last ${monthLength} Months`,
      percent: 0,
      active: false,
    },
  ];

  const columns: ColumnConfig[] = [
    { header: "Date", accessor: "date", type: "date", format: "MM/YY" },
    { header: "Purchase", accessor: "purchase", type: "number" },
    { header: "Sell", accessor: "sell", type: "number" },
    { header: "Gross", accessor: "gross", type: "number" },
  ];

  return (
    <TaxManagementPage
      data={dataByMonth}
      cardInfos={cardInfos}
      columns={columns}
      loading={loading}
    />
  );
}
