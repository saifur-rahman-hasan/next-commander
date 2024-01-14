import ApiResponse from "@/lib/http/ApiResponse";
import { withAuthUser } from "@/middlewares/withAuthUser";

export async function GET(request: Request) {
  try {
    const { user: authUser } = await withAuthUser();

    if (!authUser?.id) {
      return ApiResponse.unauthorized();
    }

    return ApiResponse.success({
      authenticated: !!authUser?.id,
      session: authUser,
    });
  }catch (e) {
    return ApiResponse.unauthorized();
  }
}
