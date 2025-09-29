import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import React from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  console.log(defaultOpen);

  return (
    <AuthGuard>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardSidebar />
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarProvider>
    </AuthGuard>
  );
};
