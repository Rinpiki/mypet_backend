-- AlterTable
ALTER TABLE "Pets" ADD COLUMN "avatar" TEXT;

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
