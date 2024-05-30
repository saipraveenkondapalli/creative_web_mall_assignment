import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "../../../../auth";
import { ObjectId } from "bson";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  let filter = {};
  const id = url.searchParams.get("id");
  if (id) {
    filter = { _id: new ObjectId(id) };
  }

  filter = { ...filter, userId };

  const client = await clientPromise;
  const response = await client
    .db()
    .collection("students")
    .find(filter)
    .toArray();
  return NextResponse.json(response);
};

const addStudent = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const data = (await req.json()) as Student;

  const student = {
    ...data,
    userId: session.user?.id,
  } as StudentInterfaceForApi;

  const client = await clientPromise;
  const response = await client.db().collection("students").insertOne(student);
  return NextResponse.json({ response });
};

const UpdateStudent = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const data = (await req.json()) as StudentInterfaceForDb;
  //  delete the userId from the data and _id
  const { _id, userId, ...dataWithoutId } = data;

  console.log(data);

  const client = await clientPromise;
  const response = await client
    .db()
    .collection("students")
    .updateOne(
      {
        _id: new ObjectId(id),
        userId: session.user?.id,
      },
      { $set: dataWithoutId },
    );

  return NextResponse.json({ response });
};

const DeleteStudent = async (req: NextRequest) => {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const response = await client
      .db()
      .collection("students")
      .deleteOne({ _id: new ObjectId(id), userId: session.user?.id });
    return NextResponse.json({ response });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};

export const PUT = auth(UpdateStudent);
export const POST = auth(addStudent);

export const DELETE = auth(DeleteStudent);
