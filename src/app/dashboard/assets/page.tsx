"use client";

//#region Imports

import { useMemo } from "react";
import { useAsset } from "@/features/assets/api/use-asset";
import AssetsPage from "@/features/assets/page";
import { useAssetTransaction } from "@/features/assets/api/use-asset-transaction";
import { useAssetBalanceAPI } from "@/hooks/use-asset-balance-api";

//#endregion

export default function Page() {
  const {
    data: assetData,
    loading: assetLoading,
    fetchData: fetchAsset,
    createData: createAsset,
    updateData: updateAsset,
    deleteData: deleteAsset,
  } = useAsset();

  const {
    data: assetTransactionData,
    loading: assetTransactionLoading,
    fetchData: fetchAssetTransaction,
    createData: createAssetTransaction,
    deleteData: deleteAssetTransaction,
    updateData: updateAssetTransaction,
  } = useAssetTransaction();

  const { data: assetBalances, fetchData: fetchAssetBalance } =
    useAssetBalanceAPI();

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
      loadingAsset={assetLoading}
      assetTransactions={assetTransactionData}
      loadingAssetTransaction={assetTransactionLoading}
      cardInfos={cardInfos}
      fetchAssetBalance={fetchAssetBalance}
      fetchAsset={fetchAsset}
      createAsset={createAsset}
      updateAsset={updateAsset}
      deleteAsset={deleteAsset}
      fetchAssetTransaction={fetchAssetTransaction}
      createAssetTransaction={createAssetTransaction}
      updateAssetTransaction={updateAssetTransaction}
      deleteAssetTransaction={deleteAssetTransaction}
    />
  );
}
