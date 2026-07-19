"use client";

//#region Imports

import { ColumnConfig } from "@/types/ui/dashboard/capital";
import { useMemo, useState } from "react";
import { useAssetAPI } from "@/hooks/use-asset-api";
import AssetsPage from "@/components/pages/assets/page";
import { useAssetTransactionAPI } from "@/hooks/use-asset-transaction-api";
import { useAssetBalanceAPI } from "@/hooks/use-asset-balance-api";

//#endregion

export default function Page() {
  const {
    data: assetData,
    loading,
    fetchData: fetchAsset,
    createData: createAsset,
    deleteData: deleteAsset,
  } = useAssetAPI();

  const {
    data: assetTransactionData,
    fetchData: fetchAssetTransaction,
    createData: createAssetTransaction,
    deleteData: deleteAssetTransaction,
    updateData: updateAssetTransaction,
  } = useAssetTransactionAPI();

  const { data: assetBalances, fetchData: fetchAssetBalance } =
    useAssetBalanceAPI();

  const columns: ColumnConfig[] = [
    { header: "Date", accessor: "date", type: "date" },
    { header: "Capital", accessor: "capital", type: "number" },
    { header: "Purchase", accessor: "purchase", type: "number" },
    { header: "Sell", accessor: "sell", type: "number" },
  ];

  const cardInfos = useMemo(
    () =>
      assetBalances.map(({ id, name, description, unit, value }) => ({
        id,
        name,
        description,
        value,
        unit,
        active: true,
        percent: 0,
      })),
    [assetBalances],
  );

  return (
    <AssetsPage
      assets={assetData}
      assetTransactions={assetTransactionData}
      cardInfos={cardInfos}
      columns={columns}
      loading={loading}
      fetchAssetBalance={fetchAssetBalance}
      fetchAsset={fetchAsset}
      createAsset={createAsset}
      deleteAsset={deleteAsset}
      fetchAssetTransaction={fetchAssetTransaction}
      createAssetTransaction={createAssetTransaction}
      updateAssetTransaction={updateAssetTransaction}
      deleteAssetTransaction={deleteAssetTransaction}
    />
  );
}
