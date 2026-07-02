"use client";

//#region Imports

import { useCapitalAPI } from "@/hooks/use-capital-api";
import { capitalSummary } from "@/utils/capital.util";
import { ColumnConfig } from "@/types/ui/dashboard/capital";
import { useMemo, useState } from "react";
import { DEFAULT_CAPITAL_FILTERS } from "@/constants/capital.constant";
import { useAssetAPI } from "@/hooks/use-asset-api";
import { assetSummary } from "@/utils/asset.util";
import AssetsPage from "@/components/pages/assets/page";

//#endregion

export default function Page() {
  const { data, loading, fetchData, createData } = useAssetAPI();

  const displayedData = useMemo(() => data.slice(0, 50), [data]);

  const columns: ColumnConfig[] = [
    { header: "Date", accessor: "date", type: "date" },
    { header: "Capital", accessor: "capital", type: "number" },
    { header: "Purchase", accessor: "purchase", type: "number" },
    { header: "Sell", accessor: "sell", type: "number" },
  ];

  const cardInfos = useMemo(
    () =>
      displayedData.map(({ name, description, unit }) => ({
        title: name,
        value: 0,
        desc: description,
        percent: 0,
        active: false,
        unit: unit,
      })),
    [displayedData],
  );

  return (
    <AssetsPage
      data={displayedData}
      cardInfos={cardInfos}
      columns={columns}
      loading={loading}
      fetchData={fetchData}
      createData={createData}
    />
  );
}
