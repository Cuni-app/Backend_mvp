-- CreateTable
CREATE TABLE "administrador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL DEFAULT 'ADMIN',
    "email" TEXT NOT NULL DEFAULT 'cuni@empresa.com',
    "password" TEXT NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id")
);
