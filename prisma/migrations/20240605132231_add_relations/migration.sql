/*
  Warnings:

  - Added the required column `updateAt` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "whatsapp" TEXT NOT NULL,
    "instagram" TEXT,
    "tiktok" TEXT,
    "facebook" TEXT,
    "x" TEXT,
    "petId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Contact_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("facebook", "id", "instagram", "petId", "tiktok", "whatsapp", "x") SELECT "facebook", "id", "instagram", "petId", "tiktok", "whatsapp", "x" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE TABLE "new_Pets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "tutor" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pets" ("age", "breed", "description", "id", "location", "name", "sex", "tutor") SELECT "age", "breed", "description", "id", "location", "name", "sex", "tutor" FROM "Pets";
DROP TABLE "Pets";
ALTER TABLE "new_Pets" RENAME TO "Pets";
PRAGMA foreign_key_check("Contact");
PRAGMA foreign_key_check("Pets");
PRAGMA foreign_keys=ON;
