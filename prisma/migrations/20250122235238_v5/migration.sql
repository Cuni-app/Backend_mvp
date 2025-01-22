/*
  Warnings:

  - You are about to drop the `amigo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "amigo" DROP CONSTRAINT "amigo_id_usuario1_fkey";

-- DropForeignKey
ALTER TABLE "amigo" DROP CONSTRAINT "amigo_id_usuario2_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fechaUltimaAccion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "amigo";

-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "id_seguidor" INTEGER NOT NULL,
    "id_seguido" INTEGER NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "follow_id_seguidor_id_seguido_key" ON "follow"("id_seguidor", "id_seguido");

-- CreateIndex
CREATE UNIQUE INDEX "follow_id_seguido_id_seguidor_key" ON "follow"("id_seguido", "id_seguidor");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_id_seguidor_fkey" FOREIGN KEY ("id_seguidor") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_id_seguido_fkey" FOREIGN KEY ("id_seguido") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
