import ApiResponse from "@/lib/http/ApiResponse";
import ServiceRepository from "@/services/ServiceAcccount/Repositories/ServiceRepository";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		const { name, email, domain, ip, dsid } = await request.json();
		const uuid = uuidv4();
		try {
			const serviceAccount = new ServiceRepository();
			serviceAccount.findById(uuid);
			const createdServiceAccount = await serviceAccount.create({
				name,
				email,
				domain,
				ip,
				dsid,
				uuid,
			});
			return ApiResponse.success(
				createdServiceAccount,
				"Service Account created successfully"
			);
		} catch (error: any) {
			return ApiResponse.error(error, error.message);
		}
	} catch (error: any) {
		return ApiResponse.error(error, error.message);
	}
};
