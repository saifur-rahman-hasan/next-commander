import BaseAction from "@/services/UserManager/Actions/BaseAction";
import ModelHasPermissionsRepository from "../Repositories/ModelHasPermissionsRepository";

export default class ModelHasPermissionsCreateAction extends BaseAction {
	private modelHasPermissionsRepository: ModelHasPermissionsRepository;

	constructor() {
		super();
		this.modelHasPermissionsRepository = new ModelHasPermissionsRepository();
	}

	async execute(
		data: ModelHasPermissionsCreateInterface
	): Promise<ModelHasPermissionsReadInterface> {
		try {
			const newModelHasPermissions =
				await this.modelHasPermissionsRepository.create(data);

			return Promise.resolve(newModelHasPermissions);
		} catch (e: any) {
			console.log("Action Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
