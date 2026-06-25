"use client";

//#region Imports

import { useCapitalAPI } from "@/hooks/use-capital-api";
import CapitalManagementPage from "@/components/pages/capital-page";
import { capitalSummary } from "@/utils/capital.util";
import { CardInfo, ColumnConfig } from "@/types/ui/dashboard/capital";
import { useMemo, useState } from "react";
import { DEFAULT_CAPITAL_FILTERS } from "@/constants/capital.constant";
import AssetManagementPage from "@/components/pages/asset-page";

//#endregion

export default function Page() {
  const { data, loading, createData, deleteData, fetchData } = useCapitalAPI();

  const [filters, setFilters] = useState(DEFAULT_CAPITAL_FILTERS);

  const displayedData = useMemo(() => data.slice(0, 50), [data]);

  const summary = useMemo(() => capitalSummary(data), [data]);

  const {
    totalPurchase,
    totalSell,
    totalCashFlow,
    purchaseDays,
    lastDateAfter1Year,
  } = summary;

  const cardInfos = useMemo<CardInfo[]>(
    () => [
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
    ],
    [totalCashFlow, totalPurchase, totalSell, purchaseDays, lastDateAfter1Year],
  );

  const columns: ColumnConfig[] = [
    { header: "Date", accessor: "date", type: "date" },
    { header: "Capital", accessor: "capital", type: "number" },
    { header: "Purchase", accessor: "purchase", type: "number" },
    { header: "Sell", accessor: "sell", type: "number" },
  ];

  return (
    <AssetManagementPage
      data={displayedData}
      cardInfos={cardInfos}
      columns={columns}
      loading={loading}
      filters={filters}
      setFilters={setFilters}
      createData={createData}
      fetchData={fetchData}
      deleteData={deleteData}
    />
  );
}
