"use client";

import { GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
import { SIDEBAR_MENU } from "@/constants/components.constant";

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isDashboard = pathname.startsWith("/dashboard");
  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/sign-in");
  };

  if (!isDashboard) return null;

  return (
    // check if url is dashboard
    pathname.startsWith("/dashboard") && (
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Logo</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="sm-scrollbar">
          <SidebarGroup>
            <SidebarMenu>
              {SIDEBAR_MENU.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild>
                    <a href={menu.url} className="font-medium">
                      {menu.title}
                    </a>
                  </SidebarMenuButton>
                  {menu.items?.length ? (
                    <SidebarMenuSub>
                      {menu.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(item.url)}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    className="font-medium cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  );
}
