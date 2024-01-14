import ApiResponse from "@/lib/http/ApiResponse";
import ModelHasPermissionsCreateAction from "@/services/Authorization/Actions/ModelHasPermissionsAction";
import ModelHasPermissionsRepository from "@/services/Authorization/Repositories/ModelHasPermissionsRepository";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import { debugLog } from "@/utils/helperFunctions";
import { NextRequest, NextResponse } from "next/server";

const modelHasPermissionsRepository = new ModelHasPermissionsRepository();

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const modelHasPermissions =
      await modelHasPermissionsRepository.findAllWithNames();
    return ApiResponse.success(modelHasPermissions, "Data Fetched");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(error, "Error");
  }
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const body = await request.json();

  debugLog("body", body);
  try {
    const userRepository = new UserRepository();
    const user_id = await userRepository.findById(body.model_id);
    if (user_id) {
      const data = {
        permission_ids: body.permission_ids,
        model_type: body.model_type,
        model_id: body.model_id,
      };
      const action = new ModelHasPermissionsCreateAction();
      const modelHasPermissions = await action.execute(data);

      return ApiResponse.success(modelHasPermissions, "Data Created");
    } else {
      return ApiResponse.notFound("User not found");
    }
  } catch (error: any) {
    return ApiResponse.error(body, error);
  }
};

export const PUT = async (request: NextRequest, response: NextResponse) => {
  const body = await request.json();
  try {
    const userRepository = new UserRepository();
    const user_id = await userRepository.findById(body.model_id);
    if (user_id) {
      const updateAction = modelHasPermissionsRepository.update(
        body.model_id,
        body.permission_ids
      );
      return ApiResponse.success(updateAction, "Data Created");
    } else {
      return ApiResponse.notFound("User not found");
    }
  } catch (error: any) {
    return ApiResponse.error(body, error);
  }
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  const body = await request.json();

  try {
    const modelHasRoles = await modelHasPermissionsRepository.delete(body);
    return ApiResponse.success(modelHasRoles, "Data Deleted");
  } catch (error: any) {
    return ApiResponse.error(body, error);
  }
};
