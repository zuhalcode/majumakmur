"use client";

import { useTrash } from "@/features/trash/api/use-trash";
//#region Imports

import TrashPage from "@/features/trash/page";

//#endregion

export default function Page() {
  const api = useTrash();
  return <TrashPage api={api} />;
}
