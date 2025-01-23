/*
  Warnings:

  - You are about to alter the column `precio` on the `item` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "item" ALTER COLUMN "precio" SET DATA TYPE INTEGER;
