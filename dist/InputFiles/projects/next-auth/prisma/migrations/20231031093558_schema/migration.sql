/*
  Warnings:

  - The primary key for the `modelhaspermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `model_type` on the `modelhaspermissions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - The primary key for the `modelhasroles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `model_type` on the `modelhasroles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `modelhaspermissions` DROP PRIMARY KEY,
    MODIFY `model_type` ENUM('USER') NOT NULL,
    ADD PRIMARY KEY (`permission_id`, `model_id`, `model_type`);

-- AlterTable
ALTER TABLE `modelhasroles` DROP PRIMARY KEY,
    MODIFY `model_type` ENUM('USER') NOT NULL,
    ADD PRIMARY KEY (`role_id`, `model_id`, `model_type`);
