import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { throwIf } from "@/lib/ErrorHandler";
import {
  RoleCreateInterface,
  RoleReadInterface,
} from "@/services/Authorization/Interfaces/RoleInterface";
import { Role } from "@prisma/client";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class RoleRepository extends PrismaBaseRepository {
  modelName: any;
  private readonly clientModel: any;

  /**
   * Initializes a new instance of the UserRepository class.
   */
  constructor() {
    super();
    this.modelName = "role"; // In Prisma, the model name is usually singular.
    this.clientModel = this.client[this.modelName]; // prisma.role.create()
  }

  async create(
    data: RoleCreateInterface
  ): Promise<RoleReadInterface | null | undefined> {
    try {
      const getData = await this.findByName(data.name);
      if (!getData) {
        const createRole = await this.clientModel.create({
          data,
        });
        return Promise.resolve(createRole);
      } else {
        throwIf(getData, "Role already exists");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async read(id: number | string): Promise<Role | null> {
    try {
      const read = await this.clientModel.findUnique({
        where: { id },
      });
      return Promise.resolve(read);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: any, data: Role | any): Promise<Role | any> {
    try {
      const getData = await this.findByName(data.name);
      if (!getData) {
        const updateRole = await this.clientModel.update({
          where: { id },
          data,
        });
        return Promise.resolve(updateRole);
      } else {
        throwIf(getData, "Role already exists");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: any, query?: object): Promise<Role> {
    try {
      const deleteRole = await this.clientModel.delete({
        where: { id },
      });
      await this.client.modelHasRoles.deleteMany({
        where: { role_id: id },
      });
      await this.client.roleHasPermissions.deleteMany({
        where: { role_id: id },
      });

      return Promise.resolve(deleteRole);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: any): Promise<Role | null> {
    return this.read(id);
  }

  async findUnique(query: object): Promise<Role | null> {
    return this.clientModel.findUnique(query);
  }

  async findByName(name: string): Promise<Role | null> {
    return this.clientModel.findUnique({
      where: { name },
    });
  }

  async findAll(): Promise<Role[]> {
    return await this.clientModel.findMany();
  }

  async findByQuery(query: object): Promise<Role[]> {
    return await this.clientModel.findMany(query);
  }

  async getByQuery(query: object): Promise<Role[]> {
    return this.findByQuery(query);
  }

  async findByIdList(idList: string[]): Promise<Role[]> {
    const roles = await this.clientModel.findMany({
      where: {
        id: {
          in: idList,
        },
      },
    });
    return roles;
  }
}
