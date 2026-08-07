"use client";

//#region Imports

import { useCapitalAPI } from "@/features/capitals/api/use-capital";
import { capitalSummary } from "@/features/capitals/capital.util";
import {
  CapitalCardInfo,
  ColumnConfig,
} from "@/features/capitals/types/capital-ui";
import { useMemo, useState } from "react";
import { DEFAULT_CAPITAL_FILTERS } from "@/features/capitals/capital.constant";
import CapitalPage from "@/features/capitals/page";

//#endregion

export default function Page() {
  const api = useCapitalAPI();

  const { data } = api;

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

  const cardInfos = useMemo<CapitalCardInfo[]>(
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

  return (
    <CapitalPage
      api={api}
      data={displayedData}
      cardInfos={cardInfos}
      filter={{ value: filters, setValue: setFilters }}
    />
  );
}
