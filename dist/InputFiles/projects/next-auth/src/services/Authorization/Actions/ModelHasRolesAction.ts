import BaseAction from "@/services/UserManager/Actions/BaseAction";
import {
  ModelHasRolesCreateInterface,
  ModelHasRolesReadInterface,
} from "../Interfaces/ModelHasRolesInteface";
import ModelHasRolesRepository from "../Repositories/ModelHasRolesRepository";

export default class ModelHasRolesCreateAction extends BaseAction {
  private modelHasRolesRepository: ModelHasRolesRepository;

  constructor() {
    super();
    this.modelHasRolesRepository = new ModelHasRolesRepository();
  }

  async execute(
    data: ModelHasRolesCreateInterface
  ): Promise<ModelHasRolesReadInterface | any> {
    try {
      const newModelHasRoles = await this.modelHasRolesRepository.create(data);

      return Promise.resolve(newModelHasRoles);
    } catch (e: any) {
      console.log("Action Error: ", e.message);
      return Promise.reject(e.message);
    }
  }
}
