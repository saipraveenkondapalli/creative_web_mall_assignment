import { auth } from "../../../../../auth";
import Unauthorized from "@/app/components/unauthorized";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "bson";
import { notFound } from "next/navigation";
import StudentForm from "@/app/dashboard/components/studentForm";

interface StudentEditProps {
  params: {
    id: string;
  };
}

export default async function EditStudent({ params }: StudentEditProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return <Unauthorized />;
  }

  const client = await clientPromise;
  const data = await client
    .db()
    .collection("students")
    .findOne<StudentInterfaceForDb>({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

  if (!data) {
    return notFound();
  }

  return <>{data && <StudentForm student={data} />}</>;
}
