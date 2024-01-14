import ApiResponse from "@/lib/http/ApiResponse";
import { withAuthUser } from "@/middlewares/withAuthUser";
import RoleCreateAction from "@/services/Authorization/Actions/RoleCreateAction";
import { RoleCreateInterface } from "@/services/Authorization/Interfaces/RoleInterface";
import RoleRepository from "@/services/Authorization/Repositories/RoleRepository";
import { convertToUpperCaseUnderscore } from "@/utils/helperFunctions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const { user: authUser } = await withAuthUser(request);

    const getRole = new RoleRepository();
    const role = await getRole.findAll();

    return ApiResponse.success(role, "Role Found");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const requestData = await request.json();
  try {
    const newRoledata: RoleCreateInterface = {
      name: convertToUpperCaseUnderscore(requestData.name),
    };

    const roleCreateAction = new RoleCreateAction();
    const newRole = await roleCreateAction.execute(newRoledata);

    return ApiResponse.success(newRole, "Role Created");
  } catch (e: any) {
    console.log(e);
    return ApiResponse.error(requestData, e);
  }
};
