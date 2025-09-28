"use client";

import React from "react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
const page = () => {
  const data = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.addUser);
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Widget Page</h1>
      {JSON.stringify(data)}
      <Button onClick={() => addUser({ name: "New User" })}> Add User</Button>
    </div>
  );
};

export default page;
