"use client";

import { useCapitalAPI } from "@/hooks/use-capital-api";
import TaxManagementPage from "@/components/pages/tax-page";
import { CardInfo, ColumnConfig } from "@/types/ui/dashboard/capital";
import { useMemo, useState } from "react";

import { buildTaxReport, buildTaxSummary } from "@/utils/tax.util";

export default function Page() {
  const { data, loading } = useCapitalAPI();

  const [year, setYear] = useState<number>(0);

  const reports = useMemo(() => buildTaxReport(data, year), [data, year]);

  const summary = useMemo(() => buildTaxSummary(reports), [reports]);

  const { totalPurchase, totalTaxPPh, monthLength } = summary;

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
      value: totalTaxPPh,

      // totalPurchase > 1000000000 ? (totalPurchase - 500000000) * 0.005 : 0,

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
      data={reports}
      cardInfos={cardInfos}
      columns={columns}
      loading={loading}
    />
  );
}
