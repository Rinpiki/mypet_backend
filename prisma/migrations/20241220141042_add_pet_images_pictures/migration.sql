/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Images";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Pictures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "photo1" TEXT,
    "photo2" TEXT,
    "photo3" TEXT,
    "photo4" TEXT,
    CONSTRAINT "Pictures_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
