//#region-imports

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetTransaction } from "@/types/dto/asset-transaction/asset-transaction.dto";

import AssetTransactionCreateDialog from "./asset-transaction-create-dialog";

import AssetTransactionTable from "./asset-transaction-table";
import { AssetTransactionHandlers } from "@/types/ui/dashboard/asset-transaction";
import { AssetResponse } from "@/features/assets/asset.dto";

//#endregion

interface Props {
  assets: AssetResponse[];
  assetTransactions: AssetTransaction[];
  loadingAssetTransaction: boolean;

  handleCreateAssetTransaction: AssetTransactionHandlers["create"];
  handleUpdateAssetTransaction: AssetTransactionHandlers["update"];
  handleDeleteAssetTransaction: AssetTransactionHandlers["delete"];
}

export default function AssetTransactions({
  assets,
  assetTransactions,
  loadingAssetTransaction,
  handleCreateAssetTransaction,
  handleUpdateAssetTransaction,
  handleDeleteAssetTransaction,
}: Props) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex-row flex justify-between items-center">
        <CardTitle>Asset Transaction</CardTitle>
        <AssetTransactionCreateDialog
          assets={assets}
          loading={loadingAssetTransaction}
          onCreate={handleCreateAssetTransaction}
        />
      </CardHeader>
      <CardContent>
        <AssetTransactionTable
          assets={assets}
          transactions={assetTransactions}
          loading={loadingAssetTransaction}
          handleDeleteAssetTransaction={handleDeleteAssetTransaction}
          handleUpdateAssetTransaction={handleUpdateAssetTransaction}
        />
      </CardContent>
    </Card>
  );
}
