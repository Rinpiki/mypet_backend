/*
  Warnings:

  - You are about to drop the `Pictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pictures";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Images_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
