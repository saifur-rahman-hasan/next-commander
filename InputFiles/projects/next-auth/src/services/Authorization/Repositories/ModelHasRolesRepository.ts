import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import { ModelHasRoles, ModelType } from "@prisma/client";
import collect from "collect.js";
import {
  ModelHasRolesCreateInterface,
  ModelHasRolesDeleteInterface,
} from "../Interfaces/ModelHasRolesInteface";
import RoleRepository from "./RoleRepository";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */

interface ModelData {
  model_id: string;
  model_email: string;
  role_ids: string[];
  role_names: string[];
}

export default class ModelHasRolesRepository extends PrismaBaseRepository {
  private userRepository: UserRepository;
  private roleRepository: RoleRepository;
  modelName: any;
  private readonly clientModel: any;

  /**
   * Initializes a new instance of the UserRepository class.
   */
  constructor() {
    super();
    this.modelName = "modelHasRoles"; // In Prisma, the model name is usually singular.
    this.clientModel = this.client[this.modelName];
    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
  }

  async read(id: any): Promise<ModelHasRoles | null> {
    return await this.clientModel.findUnique({
      where: { id },
    });
  }

  async create(data: ModelHasRolesCreateInterface): Promise<void> {
    const updateComparasion = await this.compareDataForUpdate(
      data.model_id as string,
      data.role_ids as string[]
    );
    const deleteComparasion = await this.compareDataForDelete(
      data.model_id as string,
      data.role_ids as string[]
    );

    const rolePromises = collect(updateComparasion).map(async (role_id) => {
      const role = await this.roleRepository.findById(role_id);
      if (role) {
        const rewriteData = {
          role_id: role.id,
          model_type: data.model_type,
          model_id: data.model_id,
        };
        const createData = await this.clientModel.create({
          data: rewriteData,
        });
        return createData; // Resolve the promise for this role
      }
      return false; // Reject the promise for this role
    });

    await this.deleteMany(deleteComparasion);

    const results = await Promise.all(rolePromises);

    if (results.every((result) => result)) {
      return Promise.resolve(); // All roles were processed successfully
    } else {
      return Promise.reject("One or more roles failed to process.");
    }
  }

  async update(model_id: string, role_ids: string[]): Promise<void> {
    try {
      const data = {
        model_id,
        model_type: ModelType.USER,
        role_ids,
      };
      await this.create(data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(
    data: ModelHasRolesDeleteInterface
  ): Promise<ModelHasRolesDeleteInterface> {
    try {
      if (data.model_type === ModelType.USER) {
        const deleteMany = await this.clientModel.deleteMany({
          where: {
            model_id: data.id,
          },
        });

        return Promise.resolve(deleteMany);
      } else {
        return Promise.reject(new Error("Model type not found"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteMany(deleteComparasion: any): Promise<void> {
    try {
      const deleteAll = await this.clientModel.deleteMany({
        where: {
          role_id: {
            in: deleteComparasion,
          },
        },
      });
      return Promise.resolve(deleteAll);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async modelHasRoleIds(model_id: string): Promise<string[]> {
    const modelHasRole = await this.clientModel.findMany({
      where: {
        model_id,
      },
    });
    const modelHasRoleIds: string[] = collect(modelHasRole)
      .pluck("role_id")
      .toArray();
    return Promise.resolve(modelHasRoleIds);
  }

  async compareDataForUpdate(
    model_id: string,
    role_ids: string[]
  ): Promise<string[]> {
    const modelHasRoleIds = await this.modelHasRoleIds(model_id);
    const compareDataForUpdate: string[] = collect(role_ids)
      .diff(modelHasRoleIds)
      .toArray();
    return Promise.resolve(compareDataForUpdate);
  }

  async compareDataForDelete(
    model_id: string,
    role_ids: string[]
  ): Promise<string[]> {
    const modelHasRoleIds = await this.modelHasRoleIds(model_id);
    const compareDataForDelete: string[] = collect(modelHasRoleIds)
      .diff(role_ids)
      .toArray();
    return Promise.resolve(compareDataForDelete);
  }

  async findById(id: any): Promise<ModelHasRoles | null> {
    return this.read(id);
  }

  async findAll(): Promise<ModelHasRoles[]> {
    return await this.clientModel.findMany();
  }

  async modelData(modelHasRoles: any): Promise<ModelData | any> {
    const modelMap: { [model_id: string]: ModelData } = {};

    for (const modelHasRole of modelHasRoles) {
      const roleId = modelHasRole.role_id;
      const modelId = modelHasRole.model_id;

      if (!modelMap[modelId]) {
        modelMap[modelId] = {
          model_id: modelId,
          model_email: "", // You'll need to fetch this from your data source
          role_ids: [],
          role_names: [],
        };
      }

      modelMap[modelId].role_ids.push(roleId);
    }

    return Promise.resolve(modelMap);
  }

  async formattedData(modelHasRoles: any): Promise<ModelData | any> {
    const modelData = await this.modelData(modelHasRoles);

    for (const modelId in modelData) {
      // Fetch the model name and other details from your data source
      if (ModelType.USER) {
        const model = await this.userRepository.read(modelId);

        if (model) {
          modelData[modelId].model_email = model.email as string;
        }
      }
      // Fetch the role details for each role ID in role_ids
      for (const roleId of modelData[modelId].role_ids) {
        const role = await this.roleRepository.read(roleId);

        if (role) {
          modelData[modelId].role_names.push(role.name);
        }
      }
    }
    return Promise.resolve(modelData);
  }

  async findAllWithNames(): Promise<any> {
    try {
      const modelHasRoles = await this.clientModel.findMany();

      const modelData = await this.formattedData(modelHasRoles);

      const formattedData = Object.values(modelData);
      return Promise.resolve(formattedData);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }

  async findByQuery(query: object): Promise<ModelHasRoles[]> {
    return await this.clientModel.findMany(query);
  }

  async getByQuery(query: object): Promise<ModelHasRoles[]> {
    return this.findByQuery(query);
  }

  async getRolesByModelId(model_id: string): Promise<any> {
    try {
      const modelHasRole = await this.clientModel.findMany({
        where: {
          model_id,
        },
      });

      const roleId: string[] = collect(modelHasRole).pluck("role_id").toArray();
      const roleNames = await this.roleRepository.findByIdList(roleId);
      return Promise.resolve(roleNames);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async readByModelId(model_id: string): Promise<any> {
    try {
      const modelHasRole = await this.clientModel.findFirst({
        where: {
          model_id,
        },
      });
      if (modelHasRole) {
        const getRole = await this.roleRepository.read(modelHasRole?.role_id);
        return Promise.resolve(getRole);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
