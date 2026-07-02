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

//#endregion

export default function AssetsPage(props: AssetPageProps) {
  const { data, cardInfos, columns, loading, fetchData, createData } = props;

  const handleCreateAsset = async (asset: Asset) => {
    await createData(asset);
    await fetchData();
  };

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-5 lg:px-10 mt-5">
        <div className="mx-auto">
          <AssetCreateDialog onCreate={handleCreateAsset} />
        </div>
        {/* Card Info */}
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-2">
          {cardInfos?.map(({ title, desc, percent, active, unit }, i) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <p>{title}</p>
                  {/* Dialog Edit Asset */}
                  <AssetEditDialog />
                  {/* Dialog Edit Asset */}
                  <AssetDeleteDialog />
                </CardTitle>

                {/* Value */}
                <div className={cn("text-2xl font-bold")}>
                  <p>{formatAssetValue(0, unit)}</p>
                </div>
                {/* Value */}

                <CardDescription className="flex justify-between items-center">
                  <p className="">{desc || "Last 2 months"}</p>
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
          ))}
        </div>
        {/* Card Info */}

        {/* Asset Transactions */}
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Asset Transactions</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        {/* Asset Transactions */}
      </div>
    </IntlProvider>
  );
}
