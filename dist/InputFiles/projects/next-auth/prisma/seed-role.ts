import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roleData = ["admin", "user", "guest"];
  const role = await Promise.all(
    roleData.map((name) =>
      prisma.role.upsert({
        where: { name },
        update: {},
        create: {
          name,
        },
      })
    )
  );
  console.log(role);
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
