/*
  Warnings:

  - You are about to drop the `modelhaspermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modelhasroles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `modelhaspermissions`;

-- DropTable
DROP TABLE `modelhasroles`;

-- CreateTable
CREATE TABLE `ModelHasRoles` (
    `id` VARCHAR(191) NOT NULL,
    `role_id` VARCHAR(191) NOT NULL,
    `model_type` ENUM('USER') NOT NULL,
    `model_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelHasPermissions` (
    `id` VARCHAR(191) NOT NULL,
    `permission_id` VARCHAR(191) NOT NULL,
    `model_type` ENUM('USER') NOT NULL,
    `model_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
