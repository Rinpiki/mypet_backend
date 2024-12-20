/*
  Warnings:

  - A unique constraint covering the columns `[petId]` on the table `Pictures` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pictures_petId_key" ON "Pictures"("petId");
