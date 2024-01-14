import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import PermissionRepository from "@/services/Authorization/Repositories/PermissionRepository";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import { ModelHasPermissions, ModelType } from "@prisma/client";
import collect from "collect.js";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */

interface ModelData {
  model_id: string;
  model_email: string;
  permission_ids: string[];
  permission_names: string[];
}

export default class ModelHasPermissionsRepository extends PrismaBaseRepository {
  private userRepository: UserRepository;
  private permissionRepository: PermissionRepository;
  modelName: any;
  private readonly clientModel: any;

  /**
   * Initializes a new instance of the UserRepository class.
   */
  constructor() {
    super();
    this.modelName = "modelHasPermissions"; // In Prisma, the model name is usually singular.
    this.clientModel = this.client[this.modelName];
    this.userRepository = new UserRepository();
    this.permissionRepository = new PermissionRepository();
  }

  async create(data: ModelHasPermissionsCreateInterface): Promise<void> {
    const updateComparasion = await this.compareDataForUpdate(
      data.model_id as string,
      data.permission_ids as string[]
    );
    const deleteComparasion = await this.compareDataForDelete(
      data.model_id as string,
      data.permission_ids as string[]
    );

    const permissionPromises = collect(updateComparasion).map(
      async (permission_id) => {
        const permission = await this.permissionRepository.findById(
          permission_id
        );
        if (permission) {
          const rewriteData = {
            permission_id: permission.id,
            model_type: data.model_type,
            model_id: data.model_id,
          };
          const createData = await this.clientModel.create({
            data: rewriteData,
          });
          return createData;
        }
        return false;
      }
    );

    await this.deleteMany(deleteComparasion);

    const results = await Promise.all(permissionPromises);

    if (results.every((result) => result)) {
      return Promise.resolve(); // All permissions were processed successfully
    } else {
      return Promise.reject("One or more permissions failed to process.");
    }
  }

  async read(id: any): Promise<ModelHasPermissions | null> {
    return await this.clientModel.findUnique({
      where: { id },
    });
  }

  async update(model_id: string, permission_ids: string[]): Promise<void> {
    try {
      const data = {
        model_id,
        model_type: ModelType.USER,
        permission_ids,
      };
      await this.create(data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(
    data: ModelHasPermissionsDeleteInterface
  ): Promise<ModelHasPermissionsDeleteInterface> {
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
          permission_id: {
            in: deleteComparasion,
          },
        },
      });
      return Promise.resolve(deleteAll);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async modelHasPermissionIds(model_id: string): Promise<string[]> {
    const modelHasPermission = await this.clientModel.findMany({
      where: {
        model_id,
      },
    });
    console.log("modelHasPermission", modelHasPermission);
    const modelHasPermissionIds: string[] = collect(modelHasPermission)
      .pluck("permission_id")
      .toArray();
    return Promise.resolve(modelHasPermissionIds);
  }

  async compareDataForUpdate(
    model_id: string,
    permission_ids: string[]
  ): Promise<string[]> {
    const modelHasPermissionIds = await this.modelHasPermissionIds(model_id);
    const compareDataForUpdate: string[] = collect(permission_ids)
      .diff(modelHasPermissionIds)
      .toArray();
    console.log("permission_ids", permission_ids);
    return Promise.resolve(compareDataForUpdate);
  }

  async compareDataForDelete(
    model_id: string,
    permission_ids: string[]
  ): Promise<string[]> {
    const modelHasPermissionIds = await this.modelHasPermissionIds(model_id);
    const compareDataForDelete: string[] = collect(modelHasPermissionIds)
      .diff(permission_ids)
      .toArray();
    return Promise.resolve(compareDataForDelete);
  }

  async modelData(modelHasPermissions: any): Promise<ModelData | any> {
    const modelMap: { [model_id: string]: ModelData } = {};

    for (const modelHasPermission of modelHasPermissions) {
      const permissionId = modelHasPermission.permission_id;
      const modelId = modelHasPermission.model_id;

      if (!modelMap[modelId]) {
        modelMap[modelId] = {
          model_id: modelId,
          model_email: "", // You'll need to fetch this from your data source
          permission_ids: [],
          permission_names: [],
        };
      }

      modelMap[modelId].permission_ids.push(permissionId);
    }

    return Promise.resolve(modelMap);
  }

  async formattedData(modelHasPermissions: any): Promise<ModelData | any> {
    const modelData = await this.modelData(modelHasPermissions);

    for (const modelId in modelData) {
      // Fetch the model name and other details from your data source
      if (ModelType.USER) {
        const model = await this.userRepository.read(modelId);

        if (model) {
          modelData[modelId].model_email = model.email as string;
        }
      }
      // Fetch the permission details for each permission ID in permission_ids
      for (const permissionId of modelData[modelId].permission_ids) {
        const permission = await this.permissionRepository.read(permissionId);

        if (permission) {
          modelData[modelId].permission_names.push(permission.name);
        }
      }
    }
    return Promise.resolve(modelData);
  }

  async findAllWithNames(): Promise<any> {
    try {
      const modelHasPermissions = await this.clientModel.findMany();

      const modelData = await this.formattedData(modelHasPermissions);

      const formattedData = Object.values(modelData);
      return Promise.resolve(formattedData);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }

  async findById(id: any): Promise<ModelHasPermissions | null> {
    return this.read(id);
  }

  async findAll(): Promise<ModelHasPermissions[]> {
    return await this.clientModel.findMany();
  }

  async findByQuery(query: object): Promise<ModelHasPermissions[]> {
    return await this.clientModel.findMany(query);
  }

  async getByQuery(query: object): Promise<ModelHasPermissions[]> {
    return this.findByQuery(query);
  }
}
