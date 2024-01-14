/*
  Warnings:

  - The primary key for the `modelhaspermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `modelhasroles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `modelhaspermissions` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `modelhasroles` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);
