"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

const page = () => {
  const data = useQuery(api.users.getMany);
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Widget Page</h1>
      {JSON.stringify(data)}
    </div>
  );
};

export default page;
