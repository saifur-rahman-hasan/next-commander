import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { throwIf } from "@/lib/ErrorHandler";
import collect from "collect.js";
import PermissionRepository from "./PermissionRepository";
import RoleRepository from "./RoleRepository";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */

interface PermissionData {
  role_id: string;
  role_name: string;
  permission_ids: string[];
  permission_names: string[];
}

export default class RoleHasPermissionsRepository extends PrismaBaseRepository {
  private permissionRepository: PermissionRepository;
  private roleRepository: RoleRepository;
  modelName: any;
  private readonly clientModel: any;

  /**
   * Initializes a new instance of the UserRepository class.
   */
  constructor() {
    super();
    this.modelName = "roleHasPermissions"; // In Prisma, the model name is usually singular.
    this.clientModel = this.client[this.modelName];
    this.roleRepository = new RoleRepository();
    this.permissionRepository = new PermissionRepository();
  }

  async create(data: any): Promise<any> {
    try {
      const createData = await this.clientModel.create({
        data,
      });
      return Promise.resolve(createData);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }
  async read(id: any) {
    throw new Error("Method not implemented.");
  }
  async update(id: any, data: any, query?: object | undefined) {
    throw new Error("Method not implemented.");
  }
  async delete(id: any, query?: object | undefined) {
    throw new Error("Method not implemented.");
  }
  async findById(id: any) {
    throw new Error("Method not implemented.");
  }
  async findByQuery(query: object) {
    throw new Error("Method not implemented.");
  }
  async getByQuery(query: object) {
    throw new Error("Method not implemented.");
  }

  async getAllPermissions() {
    try {
      const permissions = await this.clientModel.findMany();

      const groupedPermissions: { [role_id: string]: PermissionData } = {};

      for (const permission of permissions) {
        if (!groupedPermissions[permission.role_id]) {
          groupedPermissions[permission.role_id] = {
            role_id: permission.role_id,
            role_name: "",
            permission_ids: [],
            permission_names: [],
          };
        }
        groupedPermissions[permission.role_id].permission_ids.push(
          permission.permission_id
        );
      }

      for (const role_id in groupedPermissions) {
        const role = await this.roleRepository.findUnique({
          where: { id: role_id },
        });

        if (role) {
          groupedPermissions[role_id].role_name = role.name;
        }

        for (const permission_id of groupedPermissions[role_id]
          .permission_ids) {
          const permission = await this.permissionRepository.findUnique({
            where: { id: permission_id },
          });

          if (permission) {
            groupedPermissions[role_id].permission_names.push(permission.name);
          }
        }
      }

      const formattedData = Object.values(groupedPermissions);
      return Promise.resolve(formattedData);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }

  async findByRole(roleId: string) {
    try {
      const hasRole = await this.clientModel.findMany({
        where: {
          role_id: roleId,
        },
      });
      return Promise.resolve(hasRole);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }

  async findByPermission(permissionId: string) {
    const hasPermission = await this.clientModel.findMany({
      where: {
        permission_id: permissionId,
      },
    });

    throwIf(!hasPermission, "Permission not found");

    const roleIds: string[] = collect(hasPermission).pluck("role_id").toArray();
    const roleData = await this.roleRepository.findByIdList(roleIds);

    return roleData;
  }

  async givePermissionToRole(role_name: string, permission_names: string[]) {
    const roleData = await this.roleRepository.findByName(role_name);

    throwIf(!roleData, "Role not found");

    const permissionNames: string[] = collect(permission_names).toArray();
    const permissionIds = await this.permissionRepository.getTheIds(
      permissionNames
    );

    const data: RoleHasPermissionInterface = {
      role_id: roleData?.id as string,
      permission_ids: permissionIds as string[],
    };

    console.log(data);

    this.assignPermissionsToRole(data);

    return roleData;
  }

  async assignPermissionsToRole(
    data: RoleHasPermissionInterface
  ): Promise<any> {
    try {
      const assignmentPromises = data.permission_ids.map(
        async (permissionId) => {
          // Check if the role already has the permission
          const existingAssignment = await this.clientModel.findFirst({
            where: {
              role_id: data.role_id,
              permission_id: permissionId,
            },
          });

          if (!existingAssignment) {
            // Create the assignment
            const createAssignment = await this.clientModel.create({
              data: {
                role_id: data.role_id,
                permission_id: permissionId,
              },
            });
            return Promise.resolve(createAssignment);
          } else {
            return Promise.reject("Role already has the permission");
          }
        }
      );
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }

  // async updatePermissionToRole(data: RoleHasPermissionInterface) {
  // 	try {
  // 		const updatePromises = data.permission_ids.map(async (permissionId) => {
  // 			// Check if the role already has the permission
  // 			const existingAssignment = await this.clientModel.findFirst({
  // 				where: {
  // 					role_id: data.role_id,
  // 					permission_id: permissionId,
  // 				},
  // 			});

  // 			if (!existingAssignment) {
  // 				// Create the assignment
  // 				const createAssignment = await this.clientModel.create({
  // 					data: {
  // 						role_id: data.role_id,
  // 						permission_id: permissionId,
  // 					},
  // 				});
  // 				return Promise.resolve(createAssignment);
  // 			} else {
  // 				return Promise.reject("Role already has the permission");
  // 			}
  // 		});
  // 	} catch (error: any) {
  // 		return Promise.reject(error.message);
  // 	}
  // }

  async revokePermission(role_name: string, permission_names: string[]) {
    const roleData = await this.roleRepository.findByName(role_name);

    throwIf(!roleData, "Role not found");

    const permissionNames: string[] = collect(permission_names).toArray();
    const permissionIds = await this.permissionRepository.getTheIds(
      permissionNames
    );

    const data: RoleHasPermissionInterface = {
      role_id: roleData?.id as string,
      permission_ids: permissionIds as string[],
    };

    console.log(data);

    this.deletePermissionFromRole(data);

    return roleData;
  }

  async deletePermissionFromRole(data: RoleHasPermissionInterface) {
    const revocationPromises = data.permission_ids.map(async (permissionId) => {
      // Check if the role has the permission
      const roleHasPermission = await this.clientModel.findFirst({
        where: {
          role_id: data.role_id,
          permission_id: permissionId,
        },
      });

      throwIf(!roleHasPermission, "Role does not have the permission");
      return this.clientModel.delete({
        where: {
          permission_id_role_id: {
            permission_id: permissionId,
            role_id: data.role_id,
          },
        },
      });
    });

    return await Promise.all(revocationPromises);
  }
}
