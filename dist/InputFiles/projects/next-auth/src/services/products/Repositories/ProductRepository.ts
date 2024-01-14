import { PrismaClient, User } from "@prisma/client";
import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class ProductRepository extends PrismaBaseRepository {
	modelName: any;
	private readonly clientModel: any;

	/**
	 * Initializes a new instance of the UserRepository class.
	 */
	constructor() {
		super();
		this.modelName = "products"; // In Prisma, the model name is usually singular.
		this.clientModel = this.client[this.modelName];
	}

	/**
	 * Creates a new user record in the database.
	 *
	 * @param data - Object containing the user's data.
	 * @returns The newly created user record.
	 */
	async create(data: any): Promise<User> {
		if (!this.clientModel || typeof this.clientModel.create !== "function") {
			throw new Error(`No model found for table: ${this.modelName}`);
		}

		return await this.clientModel.create({
			data
		})
	}

	/**
	 * Retrieves a user record by its unique identifier.
	 *
	 * @param id - Unique identifier of the user to retrieve.
	 * @returns The user record if found, otherwise null.
	 */
	async read(id: any): Promise<User | null> {
		return this.clientModel.findUnique({
			where: { id },
		});
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
	async update(id: any, data: any, query?: object): Promise<User> {
		return this.clientModel.update({
			where: { id },
			data,
		});
	}

	/**
	 * Deletes a user record from the database by its unique identifier.
	 *
	 * @param id - Unique identifier of the user to delete.
	 * @param query - Optional query parameters (not used in this simple implementation).
	 * @returns The deleted user record.
	 */
	async delete(id: any, query?: object): Promise<User> {
		return this.clientModel.delete({
			where: { id },
		});
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

			return Promise.resolve(user)
		}catch (e) {
			return Promise.resolve(null)
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
