import ApiResponse from "@/lib/http/ApiResponse";
import RoleRepository from "@/services/Authorization/Repositories/RoleRepository";
import { convertToUpperCaseUnderscore } from "@/utils/helperFunctions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { roleId: string } },
  response: NextResponse
) => {
  try {
    const roleId = params.roleId;
    const roleRepository = new RoleRepository();
    const getRole = await roleRepository.findById(roleId);

    return ApiResponse.success(getRole, "Role Found");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { roleId: string } },
  response: NextResponse
) => {
  try {
    const body = await request.json();
    const roleId = params.roleId;

    const reStructuredBody = {
      id: roleId,
      name: convertToUpperCaseUnderscore(body.name),
    };

    const roleRepository = new RoleRepository();
    const updateRole = await roleRepository.update(roleId, reStructuredBody);

    return ApiResponse.success(updateRole, "Role Updated");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { roleId: string } },
  response: NextResponse
) => {
  try {
    const roleId = params.roleId;
    const roleRepository = new RoleRepository();
    const deleteRole = await roleRepository.delete(roleId);

    return ApiResponse.success(deleteRole, "Role Deleted");
  } catch (e: any) {
    console.log(e.message);
    return ApiResponse.error(e);
  }
};
