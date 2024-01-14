import BaseAction from "@/services/UserManager/Actions/BaseAction";
import ServiceRepository from "../Repositories/ServiceRepository";

export default class RoleCreateAction extends BaseAction {
	private serviceRepository: ServiceRepository;

	constructor() {
		super();
		this.serviceRepository = new ServiceRepository();
	}

	async execute(data: ServiceCreateInterface): Promise<ServiceCreateInterface> {
		try {
			const newData = await this.serviceRepository.create(data);

			return Promise.resolve(newData);
		} catch (e: any) {
			console.log("Action Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
