import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { throwIf } from "@/lib/ErrorHandler";
import {
  RoleCreateInterface,
  RoleReadInterface,
} from "@/services/Authorization/Interfaces/RoleInterface";
import { Permission, Role } from "@prisma/client";
import collect from "collect.js";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class PermissionRepository extends PrismaBaseRepository {
  modelName: any;
  private readonly clientModel: any;

  /**
   * Initializes a new instance of the UserRepository class.
   */
  constructor() {
    super();
    this.modelName = "permission"; // In Prisma, the model name is usually singular.
    this.clientModel = this.client[this.modelName];
  }

  async create(
    data: RoleCreateInterface
  ): Promise<RoleReadInterface | null | undefined> {
    try {
      const getData = await this.findByName(data.name);
      if (!getData) {
        const createPermission = await this.clientModel.create({
          data,
        });
        return Promise.resolve(createPermission);
      } else {
        throwIf(getData, "Permission already exists");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async read(id: any): Promise<Permission | null> {
    try {
      const readPermission = await this.clientModel.findUnique({
        where: { id },
      });
      return Promise.resolve(readPermission);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(
    id: any,
    data: Role | any
  ): Promise<Permission | null | undefined> {
    try {
      const getData = await this.findByName(data.name);
      if (!getData) {
        const updatePermission = this.clientModel.update({
          where: { id },
          data,
        });
        return Promise.resolve(updatePermission);
      } else {
        throwIf(getData, "Permission already exists");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: any, query?: object): Promise<Permission | null> {
    try {
      const deletePermission = await this.clientModel.delete({
        where: { id },
      });
      await this.client.modelHasPermissions.deleteMany({
        where: { permission_id: id },
      });
      await this.client.roleHasPermissions.deleteMany({
        where: { permission_id: id },
      });

      return Promise.resolve(deletePermission);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: any): Promise<Permission | null> {
    return this.read(id);
  }

  async findByName(name: string): Promise<Permission | null> {
    try {
      const permission = await this.clientModel.findUnique({
        where: { name },
      });

      return Promise.resolve(permission);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findUnique(query: object): Promise<Permission | null> {
    return this.clientModel.findUnique(query);
  }

  async findAll(): Promise<[]> {
    return this.clientModel.findMany();
  }

  async findByQuery(query: object): Promise<Permission[]> {
    return this.clientModel.findMany(query);
  }

  async getByQuery(query: object): Promise<Permission[]> {
    return this.findByQuery(query);
  }

  async findByIdList(idList: string[]): Promise<Role[]> {
    return await this.clientModel.findMany({
      where: {
        name: {
          in: idList,
        },
      },
    });
  }

  async getTheIds(idList: string[]) {
    const roles = await this.findByIdList(idList);
    const permissionIds = collect(roles).pluck("id").toArray();
    return Promise.resolve(permissionIds);
  }
}
