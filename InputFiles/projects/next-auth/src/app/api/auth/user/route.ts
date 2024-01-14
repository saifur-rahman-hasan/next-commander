import ApiResponse from "@/lib/http/ApiResponse";
import { withAuthUser } from "@/middlewares/withAuthUser";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authUser = await withAuthUser(request);

    return ApiResponse.success(authUser.user);
  } catch (e) {
    return ApiResponse.error(e);
  }
}
