import {PrismaClient} from "@prisma/client";
import PrismaClientAdapter from '@/database/adapters/Prisma/PrismaClientAdapter'

export default abstract class PrismaBaseRepository {
	abstract modelName: string
	public client: PrismaClient

	constructor() {
		this.client = PrismaClientAdapter
	}

	// Define execute as an abstract method
	abstract create(data: any): any;

	abstract read(id: any): any;

	abstract update(id: any, data: any, query?: object): any;

	abstract delete(id: any, query?: object): any;

	abstract findById(id: any): any;

	abstract findByQuery(query: object): any;

	abstract getByQuery(query: object): any;
}