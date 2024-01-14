import JwtService from "@/lib/JWTService/JWTService";
import ApiResponse from "@/lib/http/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		// Replace this with your logic to process the request body data
		const requestData = await request.json();

		// Create the JWT token with the request data using JwtService
		const accessToken = JwtService.generateToken(requestData, "90d");

		// Return the access token, refresh token, and expiration time
		return ApiResponse.success(accessToken, "Token generated successfully");
	} catch (error: any) {
		console.error(error);
		return ApiResponse.error(error, error.message);
	}
};
