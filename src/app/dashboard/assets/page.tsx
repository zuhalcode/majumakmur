"use client";

//#region Imports

import { useAsset } from "@/features/asset/hooks/use-asset";
import { useAssetBalance } from "@/features/asset/hooks/use-asset-balance";
import { useAssetTransaction } from "@/features/asset/hooks/use-asset-transaction";
import AssetsPage from "@/features/asset/page";

//#endregion

export default function Page() {
  const apiAsset = useAsset();
  const apiAssetTransaction = useAssetTransaction();
  const apiAssetBalance = useAssetBalance();

  return (
    <AssetsPage
      apiAsset={apiAsset}
      apiAssetTransaction={apiAssetTransaction}
      apiAssetBalance={apiAssetBalance}
    />
  );
}
