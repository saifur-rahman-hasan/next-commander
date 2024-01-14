// import Env from "@/config/Env";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.NEXTAUTH_SECRET || ""

class JwtService {
	private static readonly secretKey: string = JWT_SECRET_KEY;

	// Generate a new JWT token
	static generateToken(
			data: object,
			expiresIn: string | number = "1h",
			refreshToken: boolean = false
	): string {
		const options: SignOptions = {
			expiresIn,
			algorithm: "HS256", // Use the HMAC SHA-256 algorithm
		};

		if (refreshToken) {
			// Add the refresh token payload if refreshToken is true
			const refreshPayload = {
				...data, // Include the original data in the refresh token
				isRefreshToken: true,
			};

			return jwt.sign(refreshPayload, this.secretKey, options);
		} else {
			return jwt.sign(data, this.secretKey, options);
		}
	}

	// Verify a JWT token
	static verifyToken(token: string): object | string {
		const options: VerifyOptions = {
			algorithms: ["HS256"],
		};

		try {
			return jwt.verify(token, this.secretKey, options);
		} catch (error) {
			throw error;
		}
	}

	// Refresh a JWT token
	static refreshJwtToken(
		token: string,
		refreshTokenExpiry: string | number = "7d"
	): string {
		const decodedToken: any = this.verifyToken(token);

		if (decodedToken && decodedToken["isRefreshToken"]) {
			// Generate a new token with an extended expiration time
			return this.generateToken(decodedToken, refreshTokenExpiry);
		} else {
			throw new Error("Invalid refresh token");
		}
	}
}

export default JwtService;
