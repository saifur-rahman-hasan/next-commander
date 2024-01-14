import ApiResponse from "@/lib/http/ApiResponse";
import { withAuthUser } from "@/middlewares/withAuthUser";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const authUser = await withAuthUser(request);

    const userRepository = new UserRepository();
    const users = await userRepository.findAll();

    return ApiResponse.success(users, "Users retrieved successfully.");
  } catch (error: any) {
    console.error(error);
    return ApiResponse.error(error, error.message);
  }
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const authUser = await withAuthUser(request);
    const requestData = await request.json();

    const encryptPassword = await hash(requestData.password as string, 12);
    const refinedData = {
      name: requestData.name,
      email: requestData.email,
      password: encryptPassword,
    };

    const userRepository = new UserRepository();

    const user = await userRepository.create(refinedData);
    return ApiResponse.success(user, "User created successfully.");
  } catch (error: any) {
    console.error(error);
    return ApiResponse.error(error, error.message);
  }
};
