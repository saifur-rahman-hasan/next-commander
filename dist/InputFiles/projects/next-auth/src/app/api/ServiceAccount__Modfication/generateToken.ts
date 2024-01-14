// pages/api/generateToken.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import {ApiResponse} from "@/lib/ApiResponse";
import JwtService from "@/lib/JWTService/JWTService";

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	try {
		// Replace this with your logic to process the request body data
		const requestData = req.body;

		// Create the JWT token with the request data using JwtService
		const accessToken = JwtService.generateToken(requestData, '90d');

		// Return the access token, refresh token, and expiration time
		return ApiResponse.success(res, { accessToken })
	} catch (error) {
		console.error(error);
		return ApiResponse.error(res, error)
	}
};
