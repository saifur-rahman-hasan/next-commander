/*
  Warnings:

  - The required column `id` was added to the `ModelHasPermissions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ModelHasRoles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `modelhaspermissions` ADD COLUMN `id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `modelhasroles` ADD COLUMN `id` VARCHAR(191) NOT NULL;
