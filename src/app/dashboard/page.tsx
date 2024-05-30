import React from "react";
import { auth } from "../../../auth";
import Unauthorized from "@/app/components/unauthorized";
import Dashboard from "@/app/dashboard/components/dashboard";

async function Page() {
  const session = await auth();
  if (!session) {
    return <Unauthorized />;
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default Page;
