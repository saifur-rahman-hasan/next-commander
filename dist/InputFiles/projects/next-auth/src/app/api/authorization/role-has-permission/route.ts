import ApiResponse from "@/lib/http/ApiResponse";
import RoleHasPermissionsRepository from "@/services/Authorization/Repositories/RoleHasPermissionRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const roleHasPermission = new RoleHasPermissionsRepository();
    const permissions = await roleHasPermission.getAllPermissions();
    return ApiResponse.success(permissions, "Permissions retrieved");
  } catch (error) {
    console.error(error);
    return ApiResponse.error("Error retrieving permissions");
  }
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const { role_id, permission_ids } = await request.json();
  const data: RoleHasPermissionInterface = {
    role_id,
    permission_ids,
  };
  try {
    const roleHasPermission = new RoleHasPermissionsRepository();
    const assignPermissionToRole =
      await roleHasPermission.assignPermissionsToRole(data);
    console.log(assignPermissionToRole);
    return ApiResponse.success(
      assignPermissionToRole,
      "Permission assigned to role"
    );
  } catch (error: any) {
    console.error(error);
    return ApiResponse.error(data, error.message);
  }
};

// export const PUT = async (request: NextRequest, response: NextResponse) => {
// 	const { role_id, permission_ids } = await request.json();
// 	const data: RoleHasPermissionInterface = {
// 		role_id,
// 		permission_ids,
// 	};
// 	try {
// 		const roleHasPermission = new RoleHasPermissionsRepository();
// 		const updatePermissionToRole =
// 			await roleHasPermission.updatePermissionsToRole(data);
// 		return ApiResponse.success(
// 			updatePermissionToRole,
// 			"Permission updated to role"
// 		);
// 	} catch (error: any) {
// 		console.error(error);
// 		return ApiResponse.error(data, error.message);
// 	}
// }

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  const { role_id, permission_ids } = await request.json();
  const data: RoleHasPermissionInterface = {
    role_id,
    permission_ids,
  };
  try {
    const roleHasPermission = new RoleHasPermissionsRepository();
    const removePermissionFromRole =
      await roleHasPermission.deletePermissionFromRole(data);
    return ApiResponse.success(
      removePermissionFromRole,
      "Permission removed from role"
    );
  } catch (error: any) {
    console.error(error);
    return ApiResponse.error(data, error.message);
  }
};
