import TestCrudRepository from "@/services/TestCrud/Repositories/TestCrudRepository";
import { NextRequest, NextResponse } from "next/server";

const testUserCrudClass = new TestCrudRepository();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
  response: NextResponse
) => {
  const { id } = params;
  const getData = await testUserCrudClass.read(id);

  if (!getData) {
    return NextResponse.json({ message: "Data not found" }, { status: 404 });
  } else {
    return NextResponse.json(
      { getData, message: "Hello World" },
      { status: 200 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } },
  response: NextResponse
) => {
  const { id } = params;
  const { name } = await request.json();

  const updateData = await testUserCrudClass.update(id, name);

  return NextResponse.json(
    { updateData, message: "Data updated successfully." },
    { status: 200 }
  );
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
  response: NextResponse
) => {
  const { id } = params;

  const deleteData = await testUserCrudClass.delete(id);

  return NextResponse.json(
    { deleteData, message: "Data deleted successfully." },
    { status: 200 }
  );
};
