"use client";

import { useCapitalAPI } from "@/hooks/use-capital-api";
import { CardInfo, ColumnConfig } from "@/types/ui/dashboard/capital";
import CapitalManagementPage from "@/components/pages/capital-page";
import { capitalSummary } from "@/utils/capital.util";

export default function Page() {
  const { data, createData, refetch, loading, deleteData } = useCapitalAPI();
  const displayedData = data.slice(0, 10);

  const {
    totalPurchase,
    totalSell,
    totalCashFlow,
    purchaseDays,
    lastDateAfter1Year,
  } = capitalSummary(data);

  const cardInfos: CardInfo[] = [
    {
      title: "Cash Flow",
      value: totalCashFlow,
      desc: `From last ${purchaseDays} days`,
      percent: 0,
      active: false,
    },
    {
      title: "Total Customer Purchase",
      value: totalPurchase,
      desc: `From last ${purchaseDays} days`,
      percent: 0,
      active: false,
    },
    {
      title: "Total Customer Sell",
      value: totalSell,
      desc: `From last ${purchaseDays} days`,
      percent: 0,
      active: false,
    },
    {
      title: "Cash Needs",
      value: totalPurchase * 0.9,
      desc: `Until ${lastDateAfter1Year} `,
      percent: 0,
      active: false,
    },
  ];

  const columns: ColumnConfig[] = [
    { header: "Date", accessor: "date", type: "date" },
    { header: "Capital", accessor: "capital", type: "number" },
    { header: "Purchase", accessor: "purchase", type: "number" },
    { header: "Sell", accessor: "sell", type: "number" },
  ];

  return (
    <CapitalManagementPage
      data={displayedData}
      cardInfos={cardInfos}
      columns={columns}
      createData={createData}
      refetch={refetch}
      deleteData={deleteData}
      loading={loading}
    />
  );
}
