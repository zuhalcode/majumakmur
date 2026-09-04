"use client";

//#region Imports

import { useMemo } from "react";
import { useAssetBalanceAPI } from "@/features/asset/hooks/use-asset-balance";
import { useAsset } from "@/features/asset/hooks/use-asset";
import { useAssetTransaction } from "@/features/asset/hooks/use-asset-transaction";
import AssetsPage from "@/features/asset/page";

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

  return (
    <AssetsPage
      assets={assetData}
      loadingAsset={assetLoading}
      assetTransactions={assetTransactionData}
      loadingAssetTransaction={assetTransactionLoading}
      assetBalances={assetBalances}
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
