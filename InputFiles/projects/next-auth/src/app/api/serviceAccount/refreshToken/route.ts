import JwtService from "@/lib/JWTService/JWTService";
import ApiResponse from "@/lib/http/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
	request: NextRequest | any,
	response: NextResponse
) => {
	const oldToken = request.jwtAccessToken;

	try {
		const newToken = JwtService.refreshJwtToken(oldToken);

		// If the token is valid, you can access the decoded data
		return ApiResponse.success(newToken, "New Access token generated.");
	} catch (error: any) {
		console.error(error);
		if (error.name === "JsonWebTokenError") {
			return ApiResponse.unauthorized();
		}
		return ApiResponse.error(error, error.message);
	}
};
