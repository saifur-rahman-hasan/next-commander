import {
	RoleCreateInterface,
	RoleReadInterface,
} from "@/services/Authorization/Interfaces/RoleInterface";
import RoleRepository from "@/services/Authorization/Repositories/RoleRepository";
import BaseAction from "@/services/UserManager/Actions/BaseAction";

export default class RoleCreateAction extends BaseAction {
	private roleRepository: RoleRepository;

	constructor() {
		super();
		this.roleRepository = new RoleRepository();
	}

	async execute(data: RoleCreateInterface): Promise<RoleReadInterface> {
		try {
			const newRole = await this.roleRepository.create(data);

			return Promise.resolve(newRole);
		} catch (e: any) {
			console.log("RoleCreateAction Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
