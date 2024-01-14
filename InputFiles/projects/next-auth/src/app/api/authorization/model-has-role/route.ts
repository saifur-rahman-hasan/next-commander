import ApiResponse from "@/lib/http/ApiResponse";
import ModelHasRolesCreateAction from "@/services/Authorization/Actions/ModelHasRolesAction";
import ModelHasRolesRepository from "@/services/Authorization/Repositories/ModelHasRolesRepository";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";

const modelHasRoleRepository = new ModelHasRolesRepository();

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const modelHasPermissions = await modelHasRoleRepository.findAllWithNames();
    return ApiResponse.success(modelHasPermissions, "Data Fetched");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(error, "Error");
  }
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const body = await request.json();
  try {
    const userRepository = new UserRepository();
    const user_id = await userRepository.findById(body.model_id);
    if (user_id) {
      const data = {
        role_ids: body.role_ids,
        model_type: body.model_type,
        model_id: body.model_id,
      };
      const action = new ModelHasRolesCreateAction();
      const modelHasRoles = await action.execute(data);

      return ApiResponse.success(modelHasRoles, "Data Created");
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
      const updateAction = modelHasRoleRepository.update(
        body.model_id,
        body.role_ids
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
    const modelHasRoles = await modelHasRoleRepository.delete(body);
    return ApiResponse.success(modelHasRoles, "Data Deleted");
  } catch (error: any) {
    return ApiResponse.error(body, error);
  }
};
