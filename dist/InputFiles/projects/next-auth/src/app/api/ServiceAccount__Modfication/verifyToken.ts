import ApiResponse from "@/lib/http/ApiResponse";
import withJWTAuthUser from "@/middlewares/withJWTAuthUser";
import { NextApiRequest, NextApiResponse } from "next";

export default withJWTAuthUser(async function handler(
	req: NextApiRequest | any,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		const tokenData = req.authUser;
		// If the token is valid, you can access the decoded data
		return ApiResponse.success(tokenData, "Token is valid");
	} catch (error: any) {
		console.error(error);
		if (error.name === "JsonWebTokenError") {
			return ApiResponse.unauthorized();
		}

		return ApiResponse.error(res, error);
	}
});
