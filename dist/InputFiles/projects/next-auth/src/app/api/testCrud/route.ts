import TestCrudRepository from "@/services/TestCrud/Repositories/TestCrudRepository";
import { NextRequest, NextResponse } from "next/server";

const testUserCrudClass = new TestCrudRepository();

export const GET = async (request: NextRequest, response: NextResponse) => {
  const getData = await testUserCrudClass.findAll();

  return NextResponse.json(
    { getData, message: "Hello World" },
    { status: 200 }
  );
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const body = await request.json();
  const { name } = body;

  const createData = await testUserCrudClass.create(name);

  return NextResponse.json(
    { createData, message: "Data created successfully." },
    { status: 201 }
  );
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  const deleteData = await testUserCrudClass.deleteAll();

  return NextResponse.json(
    { deleteData, message: "Data deleted successfully." },
    { status: 200 }
  );
};
