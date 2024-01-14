import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const permissionData = ["can_set", "can_get", "can_update", "can_delete"];
  const permission = await Promise.all(
    permissionData.map((name) =>
      prisma.permission.upsert({
        where: { name },
        update: {},
        create: {
          name,
        },
      })
    )
  );
  console.log(permission);
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
