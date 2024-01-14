import ApiResponse from "@/lib/http/ApiResponse";
import PermissionRepository from "@/services/Authorization/Repositories/PermissionRepository";
import { convertToUpperCaseUnderscore } from "@/utils/helperFunctions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { permissionId: string } },
  response: NextResponse
) => {
  try {
    const id = params.permissionId;
    const getPermission = new PermissionRepository();
    const permission = await getPermission.findById(id);
    console.log(permission);
    return ApiResponse.success(permission, "Permission Found");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { permissionId: string } },
  response: NextResponse
) => {
  try {
    const id = params.permissionId;
    const requestData = await request.json();

    const reStructuredData = {
      name: `ACCEPT_${convertToUpperCaseUnderscore(requestData.name)}`,
    };

    const getPermission = new PermissionRepository();

    const permission = await getPermission.update(id, requestData);
    return ApiResponse.success(permission, "Permission Updated");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { permissionId: string } },
  response: NextResponse
) => {
  try {
    const id = params.permissionId;
    const getPermission = new PermissionRepository();
    const permission = await getPermission.delete(id);
    return ApiResponse.success(permission, "Permission Deleted");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};
