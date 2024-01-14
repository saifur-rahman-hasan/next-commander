import ApiResponse from "@/lib/http/ApiResponse";
import PermissionCreateAction from "@/services/Authorization/Actions/PermissionCreateAction";
import { PermissionCreateInterface } from "@/services/Authorization/Interfaces/PermissionInterface";
import PermissionRepository from "@/services/Authorization/Repositories/PermissionRepository";
import { convertToUpperCaseUnderscore } from "@/utils/helperFunctions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const getPermission = new PermissionRepository();
    const permission = await getPermission.findAll();

    return ApiResponse.success(permission, "Permission Found");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const requestData = await request.json();
  console.log(requestData);
  try {
    const newPermissiondata: PermissionCreateInterface = {
      name: `ACCEPT_${convertToUpperCaseUnderscore(requestData.name)}`,
    };

    const permissionCreateAction = new PermissionCreateAction();
    const newPermission = await permissionCreateAction.execute(
      newPermissiondata
    );

    return ApiResponse.success(newPermission, "Permission Created");
  } catch (e: any) {
    console.log(e);
    return ApiResponse.error(requestData, e);
  }
};
