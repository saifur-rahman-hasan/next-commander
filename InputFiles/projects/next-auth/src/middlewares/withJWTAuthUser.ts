import { NextApiRequest, NextApiResponse } from 'next';
import JWTService from "@/lib/JWTService/JWTService";
import ApiResponse from "@/lib/http/ApiResponse";


export default function withJWTAuthUser(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        // Get the authorization header from the request
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // If there's no or an invalid authorization header, send an unauthorized response
            return ApiResponse.unauthorized()
        }

        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];

        try {
            // Verify and decode the token using your secret or public key
            const decoded = JWTService.verifyToken(token)

            // Attach user data to the request object for further use in the API route
            // req['authUser'] = decoded
            // req['jwtAccessToken'] = token

            const authUser = {

            }
            // Call the actual API route handler with the modified request object
            return await handler(req, res);
        } catch (error) {
            // If token validation fails, send an unauthorized response
            return ApiResponse.unauthorized()
        }
    };
}
