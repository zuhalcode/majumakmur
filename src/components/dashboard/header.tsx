"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useBackup } from "@/hooks/use-backup";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const DashboardHeader = () => {
  const { backupTables } = useBackup();
  const [loading, setLoading] = useState<boolean>(false);
  const handleOnBackupData = async () => {
    setLoading(true);
    try {
      await backupTables();
    } catch (error) {
      console.log(error);
    } finally {
      toast("Backup process completed", { duration: 2000 });
      setLoading(false);
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
      <Button onClick={handleOnBackupData} disabled={loading}>
        {loading ? <Loader /> : "Backup Data"}
      </Button>
    </header>
  );
};

export default DashboardHeader;
