"use client";

//#region Imports

import { MoveDown, MoveUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IntlProvider } from "react-intl";

import { cn } from "@/lib/utils";

import { AssetPageProps } from "@/types/ui/dashboard/asset";
import AssetEditDialog from "./components/asset-edit-dialog";
import AssetCreateDialog from "./components/asset-create-dialog";
import { Asset } from "@/types/data/asset";
import { formatAssetValue } from "@/utils/asset.util";
import AssetDeleteDialog from "./components/asset-delete-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import DashboardTable from "@/components/dashboard/dashboard-table";
import AssetTransactions from "./components/asset-transactions";
import { AssetTransaction } from "@/types/data/asset-transaction";

//#endregion

export default function AssetsPage(props: AssetPageProps) {
  const {
    assets,
    assetTransactions,
    cardInfos,
    columns,
    loading,
    fetchAsset,
    createAsset,
    deleteAsset,
    fetchAssetTransaction,
    createAssetTransaction,
  } = props;

  console.log("cardinfos : ", cardInfos);

  const handleCreateAsset = async (asset: Asset) => {
    await createAsset(asset);
    await fetchAsset();
  };

  const handleDeleteAsset = async (id: string) => {
    await deleteAsset(id);
    await fetchAsset();
  };

  const handleCreateAssetTransaction = async (
    assetTransaction: AssetTransaction,
  ) => {
    await createAssetTransaction(assetTransaction);
    await fetchAssetTransaction();
  };

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-5 lg:px-10 mt-5 pb-5">
        <div className="mx-auto">
          <AssetCreateDialog onCreate={handleCreateAsset} />
        </div>

        {/* Card Info */}
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-2">
          {cardInfos?.map(
            ({ name, value, description, unit, id, active, percent }) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p>{name}</p>
                    <div className="flex space-x-2">
                      <AssetEditDialog />
                      <AssetDeleteDialog id={id} onDelete={handleDeleteAsset} />
                    </div>
                  </CardTitle>

                  {/* Value */}
                  <div className={cn("text-2xl font-bold")}>
                    <p>{formatAssetValue(value, unit)}</p>
                  </div>
                  {/* Value */}

                  <CardDescription className="flex justify-between items-center">
                    <p className="">{description || "Last 2 months"}</p>
                    {active &&
                      (percent > 0 ? (
                        <p className="text-green-500 flex">
                          <MoveUp className="size-5 text-blue-500" />
                          {percent}
                        </p>
                      ) : (
                        <p className="flex items-center text-red-500">
                          <MoveDown className="size-5" />
                          {percent}
                        </p>
                      ))}
                  </CardDescription>
                </CardHeader>
              </Card>
            ),
          )}
        </div>
        {/* Card Info */}

        {/* Asset Transactions */}
        <AssetTransactions
          assets={assets}
          assetTransactions={assetTransactions}
          handleCreateAssetTransaction={handleCreateAssetTransaction}
        />
        {/* Asset Transactions */}
      </div>
    </IntlProvider>
  );
}
