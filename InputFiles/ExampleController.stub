import { ApiController, ApiCrudController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export default class ExampleController
	extends ApiController
{

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
	}

	async index() {
		try {
            const data = []
			return ApiResponse.success(
				"All of your data retrieved successfully",
				data
			);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();

			// const action = new ExampleCreateAction();
			// const actionResponse = await executeData.execute(body);
            const createData = null

			return ApiResponse.created("Contact created successfully", createData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}
}
