import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { ServiceAccount } from "@prisma/client";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class ServiceRepository extends PrismaBaseRepository {
	modelName: any;
	private readonly clientModel: any;

	/**
	 * Initializes a new instance of the UserRepository class.
	 */
	constructor() {
		super();
		this.modelName = "serviceAccount"; // In Prisma, the model name is usually singular.
		this.clientModel = this.client[this.modelName]; // prisma.role.create()
	}

	async create(data: ServiceCreateInterface): Promise<ServiceCreateInterface> {
		try {
			const createData = await this.clientModel.create({
				data,
			});
			return Promise.resolve(createData);
		} catch (error: any) {
			return Promise.reject(error.message);
		}
	}

	async read(id: number | string): Promise<ServiceAccount | null> {
		try {
			const readData = await this.clientModel.findUnique({
				where: { id },
			});
			return Promise.resolve(readData);
		} catch (error: any) {
			return Promise.reject(error.message);
		}
	}

	async update(
		id: any,
		data: ServiceCreateInterface,
		query?: object
	): Promise<ServiceCreateInterface> {
		try {
			const updateData = await this.clientModel.create({
				data,
			});
			return Promise.resolve(updateData);
		} catch (error: any) {
			return Promise.reject(error.message);
		}
	}

	async delete(id: any, query?: object): Promise<ServiceAccount> {
		try {
			const deleteData = await this.clientModel.delete({
				where: { id },
			});
			return Promise.resolve(deleteData);
		} catch (error: any) {
			return Promise.reject(error.message);
		}
	}

	async findById(id: any): Promise<ServiceAccount | null> {
		return this.read(id);
	}

	async findByName(name: string): Promise<ServiceAccount | null> {
		return this.clientModel.findUnique({
			where: { name },
		});
	}

	async findAll(): Promise<ServiceAccount[]> {
		return await this.clientModel.findMany();
	}

	async findByQuery(query: object): Promise<ServiceAccount[]> {
		return await this.clientModel.findMany(query);
	}

	async getByQuery(query: object): Promise<ServiceAccount[]> {
		return this.findByQuery(query);
	}
}
