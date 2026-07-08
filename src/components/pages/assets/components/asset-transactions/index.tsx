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
}: {
  assets?: Asset[];
  assetTransactions?: AssetTransaction[];

  handleCreateAssetTransaction: (
    assetTransaction: AssetTransaction,
  ) => Promise<void>;
}) {
  const columns = [
    {
      header: "Source Asset",
      accessor: "source_asset",
      type: "string",
    },
    {
      header: "Qty",
      accessor: "source_quantity",
      type: "number",
    },
    {
      header: "Destination Asset",
      accessor: "destination_asset",
      type: "string",
    },
    {
      header: "Qty",
      accessor: "destination_quantity",
      type: "number",
    },
  ];

  console.log(assetTransactions);

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
        <AssetTransactionTable transactions={assetTransactions ?? []} />
      </CardContent>
    </Card>
  );
}
