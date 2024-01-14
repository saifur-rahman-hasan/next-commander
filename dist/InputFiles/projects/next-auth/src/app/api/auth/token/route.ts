import ApiResponse from "@/lib/http/ApiResponse";
import {NextRequest} from "next/server";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import JwtService from "@/lib/JWTService/JWTService";
import {throwIf} from "@/lib/ErrorHandler";
import {compare} from "bcryptjs";
import {prisma} from "@/lib/prisma";

const userRepository = new UserRepository()

interface RequestData {
	email: string,
	password: string
}


export async function POST(
	request: NextRequest
) {
	try {
		const requestData = await request.json()
		const credentials = {
			email: requestData.email,
			password: requestData.password,
		}

		const isProviderLogin = requestData?.isProviderLogin || false
		const providerAccountId = requestData?.isProviderAccountId || false

		if(isProviderLogin && providerAccountId){
			let account: any = await prisma.account.findFirst({
				where: {
					providerAccountId: providerAccountId
				}
			})

			const accountUserId = account?.userId
			throwIf(!accountUserId, "Invalid userId found in Account")

			// TODO: Find the user using id or throw exception
			const user: any = await userRepository.findById(accountUserId)
			throwIf(!user, "Invalid user found")

			// TODO: Generate JWT token using user information
			const userJwtData = {
				id: user.id,
				name: user.name,
				email: user.email,
				image: user.image,
				emailVerified: user.emailVerified,
				userVerified: user.userVerified
			}

			const userToken = JwtService.generateToken(
				userJwtData,
				"24h",
				false
			)

			return ApiResponse.success({
				accessToken: userToken
			})

		} else{
			// TODO: Find the user using email address or throw exception
			const user: any = await userRepository.findByEmail(credentials.email)

			// TODO: find the user password if not provided in the request
			// TODO: find the user password from the co

			throwIf(!user?.id || !user?.password, 'Invalid user credentials')

			// TODO: verify the user password or throw exception
			const passwordVerified = await compare(
				credentials.password,
				user.password!
			);

			throwIf(!passwordVerified, 'Invalid user credentials.')

			// TODO: Generate JWT token using user information
			const userJwtData = {
				id: user.id,
				name: user.name,
				email: user.email,
				image: user.image,
				emailVerified: user.emailVerified,
				userVerified: user.userVerified
			}

			const userToken = JwtService.generateToken(
				userJwtData,
				"24h",
				false
			)

			return ApiResponse.success({
				accessToken: userToken
			})
		}

	}catch (e: any) {
		console.log('User Token Error', e.message)
		return ApiResponse.error(e)
	}
}