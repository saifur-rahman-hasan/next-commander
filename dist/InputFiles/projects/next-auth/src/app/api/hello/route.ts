import {NextRequest} from "next/server";
import ApiResponse from "@/lib/http/ApiResponse";
import {withAuthUser} from "@/middlewares/withAuthUser";

export async function GET(request: NextRequest) {
  const authUser = await withAuthUser()

  return ApiResponse.success({
    authUser: authUser?.user,
    accessToken: authUser?.accessToken,
    cookies: request.cookies.getAll()
  })
}
