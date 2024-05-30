import React from "react";
import StudentForm from "@/app/dashboard/components/studentForm";
import { auth } from "../../../../auth";
import Unauthorized from "@/app/components/unauthorized";

async function Page() {
  const session = await auth();

  if (!session) {
    return <Unauthorized />;
  }

  return <StudentForm />;
}

export default Page;
