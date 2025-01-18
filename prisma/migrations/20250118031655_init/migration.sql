-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "racha" INTEGER NOT NULL DEFAULT 0,
    "monedas" INTEGER NOT NULL DEFAULT 0,
    "fechaCreacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amigo" (
    "id" SERIAL NOT NULL,
    "id_usuario1" INTEGER NOT NULL,
    "id_usuario2" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "amigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resultado" (
    "id" SERIAL NOT NULL,
    "tiempo" INTEGER NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "cantidadCorrectas" INTEGER NOT NULL,
    "cantidadIncorrectas" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "resultado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pregunta" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "imagen_url" TEXT,
    "solucion_url" TEXT,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respuesta" (
    "id" SERIAL NOT NULL,
    "esCorrecto" BOOLEAN NOT NULL,
    "contenido" TEXT NOT NULL,
    "id_pregunta" INTEGER NOT NULL,

    CONSTRAINT "respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsuarioItems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UsuarioItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "amigo_id_usuario1_id_usuario2_key" ON "amigo"("id_usuario1", "id_usuario2");

-- CreateIndex
CREATE UNIQUE INDEX "amigo_id_usuario2_id_usuario1_key" ON "amigo"("id_usuario2", "id_usuario1");

-- CreateIndex
CREATE UNIQUE INDEX "resultado_id_usuario_id_categoria_key" ON "resultado"("id_usuario", "id_categoria");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nombre_key" ON "categoria"("nombre");

-- CreateIndex
CREATE INDEX "_UsuarioItems_B_index" ON "_UsuarioItems"("B");

-- AddForeignKey
ALTER TABLE "amigo" ADD CONSTRAINT "amigo_id_usuario1_fkey" FOREIGN KEY ("id_usuario1") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amigo" ADD CONSTRAINT "amigo_id_usuario2_fkey" FOREIGN KEY ("id_usuario2") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultado" ADD CONSTRAINT "resultado_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultado" ADD CONSTRAINT "resultado_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pregunta" ADD CONSTRAINT "pregunta_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuesta" ADD CONSTRAINT "respuesta_id_pregunta_fkey" FOREIGN KEY ("id_pregunta") REFERENCES "pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioItems" ADD CONSTRAINT "_UsuarioItems_A_fkey" FOREIGN KEY ("A") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioItems" ADD CONSTRAINT "_UsuarioItems_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
