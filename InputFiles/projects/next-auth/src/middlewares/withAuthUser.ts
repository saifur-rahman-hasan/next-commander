import JWTService from "@/lib/JWTService/JWTService";
import {authOptions} from "@/lib/auth";
import ModelHasRolesRepository from "@/services/Authorization/Repositories/ModelHasRolesRepository";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import {getServerSession} from "next-auth";
import {headers} from "next/headers";
import {NextRequest} from "next/server";
import {throwIf} from "@/lib/ErrorHandler";
import JwtService from "@/lib/JWTService/JWTService";
import {prisma} from "@/lib/prisma";

const userRepository = new UserRepository()

export async function withAuthUser(request: NextRequest) {
  try {

    return await getTokenInfo();

  } catch (e: any) {
    console.log("withAuthUser Error:", e.message);
    throw new Error("Unauthorized Access");
  }
}


async function getTokenInfo() {
  try {
    const session: any = await getServerSession(authOptions);
    const sessionUserEmail = session?.user?.email

    let authAccessToken = await getAuthAccessTokenFromSession(session);

    if(!authAccessToken && sessionUserEmail){
      console.log(`authAccessToken not found - creating a new one`)

      const findUserByEmail: any = await userRepository.findByEmail(sessionUserEmail);
      throwIf(!findUserByEmail, "User not found")

      // TODO: find the account info
      const userAccount: any = await prisma.account.findFirst({
        where: {
          userId: findUserByEmail.id
        }
      })

      throwIf(!userAccount, 'Invalid account Id')

      // TODO: Generate JWT token using user information
      const userJwtData = {
        id: findUserByEmail.id,
        name: findUserByEmail.name,
        email: findUserByEmail.email,
        image: findUserByEmail.image,
        emailVerified: findUserByEmail.emailVerified,
        userVerified: findUserByEmail.userVerified,
        providerAccountId: userAccount.providerAccountId
      }

      const authAccessToken = JwtService.generateToken(
          userJwtData,
          "24h",
          false
      )

      const userRole = await getUserRole(findUserByEmail.id);

      const user = {
        ...findUserByEmail,
        role: userRole?.name,
      };

      return {
        user,
        accessToken: authAccessToken,
      };

    }else{
      const user = await getUserFromAccessToken(authAccessToken);

      return {
        user,
        accessToken: authAccessToken,
      };
    }


  } catch (error: any) {
    console.log(`Invalid token Error`, error.message);
    throw new Error("Invalid token");
  }
}

export async function getAuthAccessTokenFromSession(session: any) {
  const sessionUser: any = session?.user || null;
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization") || "";
  const accessToken = authorization.split(" ")[1] || null;

  return sessionUser?.accessToken || accessToken;
}

async function getUserFromAccessToken(authAccessToken: string) {
  const authUser: any = JWTService.verifyToken(authAccessToken);

  const findUserByEmail = await userRepository.findByEmail(authUser.email);

  if (!findUserByEmail) {
    throw new Error("User not found");
  }

  const userRole = await getUserRole(findUserByEmail.id);

  return {
    ...findUserByEmail,
    role: userRole?.name,
  };
}


export async function getUserRole(modelId: string) {
  const modelRole = new ModelHasRolesRepository();
  return modelRole.readByModelId(modelId);
}
