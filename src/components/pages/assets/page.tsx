"use client";

//#region Imports

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IntlProvider } from "react-intl";

import { cn } from "@/lib/utils";

import { AssetHandlers, AssetPageProps } from "@/types/ui/dashboard/asset";
import AssetEditDialog from "./components/asset-edit-dialog";
import AssetCreateDialog from "./components/asset-create-dialog";
import { formatAssetValue } from "@/utils/asset.util";
import AssetDeleteDialog from "./components/asset-delete-dialog";
import AssetTransactions from "./components/asset-transactions";

import { AssetTransactionHandlers } from "@/types/ui/dashboard/asset-transaction";

//#endregion

export default function AssetsPage(props: AssetPageProps) {
  const {
    assets,
    loadingAsset,

    assetTransactions,
    loadingAssetTransaction,
    cardInfos,

    fetchAssetBalance,

    fetchAsset,
    createAsset,
    updateAsset,
    deleteAsset,

    fetchAssetTransaction,
    createAssetTransaction,
    updateAssetTransaction,
    deleteAssetTransaction,
  } = props;

  const handleCreateAsset: AssetHandlers["create"] = async (dto) => {
    await createAsset(dto);
    await fetchAsset();
    await fetchAssetBalance();
  };

  const handleUpdateAsset: AssetHandlers["update"] = async (dto) => {
    await updateAsset(dto);
    await fetchAsset();
    await fetchAssetBalance();
  };

  const handleDeleteAsset: AssetHandlers["delete"] = async (id) => {
    await deleteAsset(id);
    await fetchAsset();
    await fetchAssetBalance();
  };

  const handleCreateAssetTransaction: AssetTransactionHandlers["create"] =
    async (dto) => {
      await createAssetTransaction(dto);
      await fetchAssetTransaction();
      await fetchAssetBalance();
    };

  const handleUpdateAssetTransaction: AssetTransactionHandlers["update"] =
    async (dto) => {
      await updateAssetTransaction(dto);
      await fetchAssetTransaction();
      await fetchAssetBalance();
    };

  const handleDeleteAssetTransaction: AssetTransactionHandlers["delete"] =
    async (id) => {
      await deleteAssetTransaction(id);
      await fetchAssetTransaction();
      await fetchAssetBalance();
    };

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-5 lg:px-10 mt-5 pb-5">
        <div className="mx-auto">
          <AssetCreateDialog
            loading={loadingAsset}
            onCreate={handleCreateAsset}
          />
        </div>

        {/* Card Info */}
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-2">
          {cardInfos?.map((asset) => (
            <Card key={asset.id}>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <p>{asset.name}</p>
                  <div className="flex space-x-2">
                    <AssetEditDialog
                      asset={asset}
                      loading={loadingAsset}
                      onEdit={handleUpdateAsset}
                    />
                    <AssetDeleteDialog
                      id={asset.id}
                      loading={loadingAsset}
                      onDelete={handleDeleteAsset}
                    />
                  </div>
                </CardTitle>

                {/* Value */}
                <div className={cn("text-2xl font-bold")}>
                  <p>{formatAssetValue(asset.value, asset.unit)}</p>
                </div>
                {/* Value */}

                <CardDescription className="flex justify-between items-center">
                  <p className="">{asset.description || "Last 2 months"}</p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        {/* Card Info */}

        {/* Asset Transactions */}
        <AssetTransactions
          assets={assets}
          assetTransactions={assetTransactions}
          loadingAssetTransaction={loadingAssetTransaction}
          handleDeleteAssetTransaction={handleDeleteAssetTransaction}
          handleCreateAssetTransaction={handleCreateAssetTransaction}
          handleUpdateAssetTransaction={handleUpdateAssetTransaction}
        />
        {/* Asset Transactions */}
      </div>
    </IntlProvider>
  );
}
