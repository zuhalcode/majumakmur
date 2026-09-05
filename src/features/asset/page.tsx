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

import {
  AssetBalance,
  AssetHandlers,
  AssetResponse,
} from "@/features/asset/types/asset.types";
import AssetEditDialog from "./components/asset-edit-dialog";
import AssetCreateDialog from "./components/asset-create-dialog";
import { formatAssetValue } from "@/features/asset/asset.util";
import AssetDeleteDialog from "./components/asset-delete-dialog";
import AssetTransactions from "./components/asset-transaction";

import {
  AssetTransactionHandlers,
  AssetTransactionResponse,
} from "@/features/asset/types/asset-transaction.types";
import { SkeletonCard } from "@/components/skeleton/skeleton-card";
import { useAsset } from "./hooks/use-asset";
import { useAssetTransaction } from "./hooks/use-asset-transaction";
import { useAssetBalance } from "./hooks/use-asset-balance";

//#endregion

interface Props {
  apiAsset: ReturnType<typeof useAsset>;
  apiAssetTransaction: ReturnType<typeof useAssetTransaction>;
  apiAssetBalance: ReturnType<typeof useAssetBalance>;
}

export default function AssetsPage(props: Props) {
  const { apiAsset, apiAssetTransaction, apiAssetBalance } = props;

  const {
    data: assets,
    loading: loadingAsset,
    fetch: fetchAsset,
    create: createAsset,
    update: updateAsset,
    remove: removeAsset,
  } = apiAsset;

  const {
    data: assetTransactions,
    loading: loadingAssetTransaction,
    fetch: fetchAssetTransaction,
    create: createAssetTransaction,
    update: updateAssetTransaction,
    remove: removeAssetTransaction,
  } = apiAssetTransaction;

  const { data: assetBalances, fetch: fetchAssetBalance } = apiAssetBalance;

  const refreshAssets = async () => {
    await Promise.all([fetchAsset(), fetchAssetBalance()]);
  };

  const refreshAssetTransactions = async () => {
    await Promise.all([fetchAssetTransaction(), fetchAssetBalance()]);
  };

  const handleCreateAsset: AssetHandlers["create"] = async (payload) => {
    await createAsset(payload);
    await refreshAssets();
  };

  const handleUpdateAsset: AssetHandlers["update"] = async (payload) => {
    await updateAsset(payload);
    await refreshAssets();
  };

  const handleDeleteAsset: AssetHandlers["delete"] = async (id) => {
    await removeAsset(id);
    await refreshAssets();
  };

  const handleCreateAssetTransaction: AssetTransactionHandlers["create"] =
    async (dto) => {
      await createAssetTransaction(dto);
      await refreshAssetTransactions();
    };

  const handleUpdateAssetTransaction: AssetTransactionHandlers["update"] =
    async (dto) => {
      await updateAssetTransaction(dto);
      await refreshAssetTransactions();
    };

  const handleDeleteAssetTransaction: AssetTransactionHandlers["delete"] =
    async (id) => {
      await removeAssetTransaction(id);
      await refreshAssetTransactions();
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
          {loadingAsset ? (
            <SkeletonCard />
          ) : (
            assetBalances?.map((asset) => (
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

                      {!asset.has_transaction && (
                        <AssetDeleteDialog
                          id={asset.id}
                          onDelete={handleDeleteAsset}
                        />
                      )}
                    </div>
                  </CardTitle>

                  {/* Value */}
                  <div className={cn("text-2xl font-bold")}>
                    <p>{formatAssetValue(asset.balance, asset.unit)}</p>
                  </div>
                  {/* Value */}

                  <CardDescription className="flex justify-between items-center">
                    <p className="">{asset.description || "Last 2 months"}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
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
