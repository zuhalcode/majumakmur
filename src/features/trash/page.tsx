"use client";

//#region Imports

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { IntlProvider } from "react-intl";
import TrashTable from "./components/table";
import { TrashHandlers, TrashItem, TrashResource } from "./trash";
import { useTrash } from "./api/use-trash";
import { Loader } from "lucide-react";

//#endregion

interface PageProps {
  api: ReturnType<typeof useTrash>;
}

export default function TrashPage({ api }: PageProps) {
  const { refetch, data, loading, restore, destroy } = api;

  const handleRestoreTrash: TrashHandlers["restore"] = async (resource, id) => {
    await restore(resource, id);
    await refetch();
  };

  const handleDestroyTrash: TrashHandlers["destroy"] = async (resource, id) => {
    await destroy(resource, id);
    await refetch();
  };

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-5 lg:px-10">
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-2"></div>

        <div className="flex gap-2"></div>

        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Trash Management</CardTitle>
          </CardHeader>
          <CardContent>
            <TrashTable
              trashItems={data}
              loading={loading}
              onRestore={handleRestoreTrash}
              onDestroy={handleDestroyTrash}
            />
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
}
