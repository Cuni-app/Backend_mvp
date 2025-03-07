/*
  Warnings:

  - You are about to drop the `administrador` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "rol" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fecha_premium_vencimiento" TIMESTAMP(3),
ADD COLUMN     "rol" "rol" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "administrador";

-- CreateTable
CREATE TABLE "PreguntasRealizadas" (
    "id" SERIAL NOT NULL,
    "es_correcto" BOOLEAN NOT NULL,
    "id_pregunta" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "PreguntasRealizadas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreguntasRealizadas" ADD CONSTRAINT "PreguntasRealizadas_id_pregunta_fkey" FOREIGN KEY ("id_pregunta") REFERENCES "pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreguntasRealizadas" ADD CONSTRAINT "PreguntasRealizadas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
