import { NextApiRequest, NextApiResponse } from 'next';
import {ApiResponse} from "@/lib/ApiResponse";
import withJWTAuthUser from "@/middlewares/withJWTAuthUser";
import JwtService from "@/lib/JWTService/JWTService";

export default withJWTAuthUser(
	async function handler(req: NextApiRequest | any, res: NextApiResponse) {
		if (req.method !== 'POST') {
			return res.status(405).json({ message: 'Method Not Allowed' });
		}

		const oldToken = req.jwtAccessToken

		try {
			const newToken = JwtService.refreshJwtToken(oldToken);

			// If the token is valid, you can access the decoded data
			return ApiResponse.success(res, newToken, 'New Access token generated.')
		} catch (error) {
			console.error(error);
			if (error.name === 'JsonWebTokenError') {
				return ApiResponse.unauthorized(res)
			}

			return ApiResponse.error(res,  error)
		}
	}
)
