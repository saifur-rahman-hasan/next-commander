import ApiResponse from "@/lib/http/ApiResponse";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	request: NextRequest,
	{ params }: { params: { id: string } },
	response: NextResponse
) => {
	try {
		// const authUser = await withAuthUser();
		const { id } = params;
		const userRepository = new UserRepository();
		const user = await userRepository.read(id as string);
		return ApiResponse.success(user, "User retrieved successfully.");
	} catch (error: any) {
		console.error(error);
		return ApiResponse.error(error, error.message);
	}
};

export const PUT = async (
	request: NextRequest,
	{ params }: { params: { id: string } },
	response: NextResponse
) => {
	try {
		// const authUser = await withAuthUser();
		const { id } = params;
		const requestData = await request.json();

		const encryptPassword = await hash(requestData.password as string, 12);
		const refinedData = {
			...requestData,
			password: encryptPassword,
		};

		const userRepository = new UserRepository();

		const user = await userRepository.update(id as string, refinedData);
		return ApiResponse.success(user, "User updated successfully.");
	} catch (error: any) {
		console.error(error);
		return ApiResponse.error(error, error.message);
	}
};

export const DELETE = async (
	request: NextRequest,
	{ params }: { params: { id: string } },
	response: NextResponse
) => {
	try {
		// const authUser = await withAuthUser();
		const { id } = params;
		const userRepository = new UserRepository();
		const user = await userRepository.delete(id as string);
		return ApiResponse.success(user, "User deleted successfully.");
	} catch (error: any) {
		console.error(error);
		return ApiResponse.error(error, error.message);
	}
};
