"use client";

import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { SidebarInset } from "@workspace/ui/components/sidebar";

const page = () => {

  return (
    <SidebarInset>
      <div className="flex justify-center items-center h-screen">
        <h1>Web Page</h1>
        <UserButton />
      </div>
    </SidebarInset>
  );
};

export default page;
