import { ModelType, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  });
  if (user) {
    try {
      const findRole = await prisma.role.upsert({
        where: {
          name: "admin",
        },
        update: {},
        create: {
          name: "admin",
        },
      });
      const data = {
        model_type: ModelType.USER,
        model_id: user.id as string,
        role_id: findRole?.id as string,
      };
      const findFirst = await prisma.modelHasRoles.findFirst({
        where: {
          model_id: user.id,
        },
      });
      if (!findFirst) {
        const assignRole = await prisma.modelHasRoles.create({
          data,
        });
        console.log(assignRole);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
