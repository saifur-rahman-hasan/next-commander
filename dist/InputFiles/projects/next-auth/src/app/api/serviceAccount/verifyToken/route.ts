import ApiResponse from "@/lib/http/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
	request: NextRequest | any,
	response: NextResponse
) => {
	try {
		const tokenData = request.authUser;
		// If the token is valid, you can access the decoded data
		return ApiResponse.success(tokenData, "Token is valid");
	} catch (error: any) {
		console.error(error);
		if (error.name === "JsonWebTokenError") {
			return ApiResponse.unauthorized();
		}

		return ApiResponse.error(response, error);
	}
};
