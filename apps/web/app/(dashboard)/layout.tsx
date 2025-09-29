import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default layout;
