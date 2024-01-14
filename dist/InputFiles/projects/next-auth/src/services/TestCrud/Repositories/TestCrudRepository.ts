import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";

export default class TestCrudRepository extends PrismaBaseRepository {
  modelName: any;
  private readonly clientModel: any;

  constructor() {
    super();
    this.modelName = "testUserCrud";
    this.clientModel = this.client[this.modelName]; // prisma.testUserCrud
  }

  async create(name: string): Promise<any> {
    try {
      const createData = await this.clientModel.create({
        data: {
          name,
        },
      });

      return Promise.resolve(createData);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async read(id: any) {
    try {
      const read = await this.clientModel.findUnique({
        where: { id },
      });

      return Promise.resolve(read);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: string, name: string) {
    try {
      const checkData = await this.read(id);
      if (!checkData) {
        return Promise.reject("Data not found");
      } else {
        const updateData = await this.clientModel.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });

        return Promise.resolve(updateData);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: any, query?: object | undefined) {
    try {
      const deleteData = await this.clientModel.delete({
        where: {
          id,
        },
      });

      return Promise.resolve(deleteData);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const findAll = await this.clientModel.findMany();

      return Promise.resolve(findAll);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteAll(): Promise<any> {
    try {
      const deleteAll = await this.clientModel.deleteMany();
      return Promise.resolve(deleteAll);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  findById(id: any) {
    throw new Error("Method not implemented.");
  }

  findByQuery(query: object) {
    throw new Error("Method not implemented.");
  }

  getByQuery(query: object) {
    throw new Error("Method not implemented.");
  }
}
