"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useBackup } from "@/hooks/use-backup";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const DashboardHeader = () => {
  const { backup, loading } = useBackup();

  const handleOnBackupData = async () => {
    try {
      await backup();
      toast("Backup process completed", { duration: 2000 });
    } catch (error) {
      console.log(error);
      toast("Backup process error", { duration: 2000 });
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
      <Button onClick={handleOnBackupData} disabled={loading}>
        {loading ? <Loader className="animate-spin" /> : "Backup Data"}
      </Button>
    </header>
  );
};

export default DashboardHeader;
