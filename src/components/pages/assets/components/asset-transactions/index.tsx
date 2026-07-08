import DashboardTable from "@/components/dashboard/dashboard-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetTransaction } from "@/types/data/asset-transaction";
import AssetTransactionCreateDialog from "./asset-transaction-create-dialog";
import { Asset } from "@/types/data/asset";
import AssetTransactionTable from "./asset-transaction-table";

export default function AssetTransactions({
  assets,
  assetTransactions,
  handleCreateAssetTransaction,
  handleDeleteAssetTransaction,
}: {
  assets?: Asset[];
  assetTransactions?: AssetTransaction[];

  handleCreateAssetTransaction: (
    assetTransaction: AssetTransaction,
  ) => Promise<void>;

  handleDeleteAssetTransaction: (id: string) => Promise<void>;
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
          handleDeleteAssetTransaction={handleDeleteAssetTransaction}
        />
      </CardContent>
    </Card>
  );
}
