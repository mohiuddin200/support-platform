import { DashboardLayout } from "@/modules/dashboard/ui/layout/dashboard-layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
