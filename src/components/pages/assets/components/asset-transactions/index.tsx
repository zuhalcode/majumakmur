//#region-imports

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AssetTransaction,
  CreateAssetTransactionDTO,
  UpdateAssetTransactionDTO,
} from "@/types/dto/asset-transaction/asset-transaction.dto";

import AssetTransactionCreateDialog from "./asset-transaction-create-dialog";
import { Asset } from "@/types/data/asset";
import AssetTransactionTable from "./asset-transaction-table";
import { AssetTransactionHandlers } from "@/types/ui/dashboard/asset-transaction";

//#endregion

export default function AssetTransactions({
  assets,
  assetTransactions,
  handleCreateAssetTransaction,
  handleUpdateAssetTransaction,
  handleDeleteAssetTransaction,
}: {
  assets?: Asset[];
  assetTransactions?: AssetTransaction[];

  handleCreateAssetTransaction: AssetTransactionHandlers["create"];
  handleUpdateAssetTransaction: AssetTransactionHandlers["update"];
  handleDeleteAssetTransaction: AssetTransactionHandlers["delete"];
}) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex-row flex justify-between items-center">
        <CardTitle>Asset Transaction</CardTitle>
        <AssetTransactionCreateDialog
          assets={assets}
          onCreate={handleCreateAssetTransaction}
        />
      </CardHeader>
      <CardContent>
        <AssetTransactionTable
          transactions={assetTransactions ?? []}
          assets={assets ?? []}
          handleDeleteAssetTransaction={handleDeleteAssetTransaction}
          handleUpdateAssetTransaction={handleUpdateAssetTransaction}
        />
      </CardContent>
    </Card>
  );
}
