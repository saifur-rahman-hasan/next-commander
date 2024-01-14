import { PermissionCreateInterface } from "@/services/Authorization/Interfaces/PermissionInterface";
import PermissionRepository from "@/services/Authorization/Repositories/PermissionRepository";
import BaseAction from "@/services/UserManager/Actions/BaseAction";
import { RoleReadInterface } from "../Interfaces/RoleInterface";

export default class PermissionCreateAction extends BaseAction {
	private permissionRepository: PermissionRepository;

	constructor() {
		super();
		this.permissionRepository = new PermissionRepository();
	}

	async execute(
		data: PermissionCreateInterface
	): Promise<RoleReadInterface | null | undefined> {
		try {
			const newPermission = await this.permissionRepository.create(data);

			console.log("PermissionCreateAction Success: ", newPermission);

			return Promise.resolve(newPermission);
		} catch (e: any) {
			console.log("PermissionCreateAction Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
