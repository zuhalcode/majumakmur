import React from "react";
import HeaderAuth from "./header-auth";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { createClient } from "@/app/utils/supabase/server";
import { SidebarTrigger } from "./ui/sidebar";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <nav className="w-full flex bg-zinc-900 justify-center items-center border-b border-b-foreground/10 px-3 gap-10">
        {user && (
          <>
            <SidebarTrigger />
            <Button size="sm" variant="outline">
              Update Data
            </Button>
          </>
        )}

        <div className="w-full flex justify-between xl:justify-end items-center px-3 py-2 text-sm">
          <HeaderAuth />
        </div>
      </nav>
    </>
  );
}
