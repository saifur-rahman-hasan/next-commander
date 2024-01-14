import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { throwIf } from "@/lib/ErrorHandler";
import {
  UserCreateInterface,
  UserReadInterface,
} from "@/services/UserManager/Interfaces/UserManagerInterface";
import { User } from "@prisma/client";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class UserRepository extends PrismaBaseRepository {
  modelName: any;
  private readonly clientModel: any;

  /**
   * Initializes a new instance of the UserRepository class.
   */
  constructor() {
    super();
    this.modelName = "user"; // In Prisma, the model name is usually singular.
    this.clientModel = this.client[this.modelName];
  }

  /**
   * Creates a new user record in the database.
   *
   * @param data - Object containing the user's data.
   * @returns The newly created user record.
   */
  async create(data: UserCreateInterface): Promise<UserReadInterface> {
    try {
      const findUser = await this.findByEmail(data.email);
      throwIf(findUser, "User already exists");

      const createUser = await this.clientModel.create({
        data,
      });
      return Promise.resolve(createUser);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Retrieves a user record by its unique identifier.
   *
   * @param id - Unique identifier of the user to retrieve.
   * @returns The user record if found, otherwise null.
   */
  async read(id: any): Promise<User | null> {
    try {
      const user = await this.clientModel.findUnique({
        where: { id },
      });
      return user;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Retrieves a user record by its unique identifier.
   *
   * @returns The user record if found, otherwise null.
   * @param query
   */
  async findAll(query?: any): Promise<User | null> {
    return this.clientModel.findMany();
  }

  /**
   * Updates a user record identified by its unique identifier with new data.
   *
   * @param id - Unique identifier of the user to update.
   * @param data - Object containing the new data for the user.
   * @param query - Optional query parameters (not used in this simple implementation).
   * @returns The updated user record.
   */
  async update(
      id: any,
      data: any,
      query?: object
  ): Promise<User> {
    try {
      const updateUser = await this.clientModel.update({
        where: { id },
        data,
      });
      return Promise.resolve(updateUser);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Deletes a user record from the database by its unique identifier.
   *
   * @param id - Unique identifier of the user to delete.
   * @param query - Optional query parameters (not used in this simple implementation).
   * @returns The deleted user record.
   */
  async delete(id: any, query?: object): Promise<User> {
    try {
      const deleteUser = await this.clientModel.delete({
        where: { id },
      });
      return Promise.resolve(deleteUser);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Finds a user record by its unique identifier.
   * This method is similar to 'read' and can be used interchangeably.
   *
   * @param id - Unique identifier of the user to find.
   * @returns The user record if found, otherwise null.
   */
  async findById(id: any): Promise<User | null> {
    return this.read(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = this.clientModel.findUnique({
        where: { email: email },
      });

      return Promise.resolve(user);
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  /**
   * Retrieves user records matching specific query criteria.
   *
   * @param query - Query object containing the criteria for selecting users.
   * @returns An array of user records matching the query.
   */
  async findByQuery(query: object): Promise<User[]> {
    // Here, you would add your query logic. This is a simplified placeholder.
    // You would need to construct a proper query based on your 'query' object.
    return this.clientModel.findMany(query);
  }

  async findUnique(query: object): Promise<User | null> {
    return this.clientModel.findUnique(query);
  }

  /**
   * Retrieves user records based on a provided query.
   * This method is similar to 'findByQuery' and can be used interchangeably.
   *
   * @param query - Query object containing the criteria for selecting users.
   * @returns An array of user records that match the query.
   */
  async getByQuery(query: object): Promise<User[]> {
    return this.findByQuery(query);
  }
}
