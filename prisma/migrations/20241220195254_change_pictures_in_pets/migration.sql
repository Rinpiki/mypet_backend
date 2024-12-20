/*
  Warnings:

  - You are about to drop the `Pictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Pets" ADD COLUMN "photo1" TEXT;
ALTER TABLE "Pets" ADD COLUMN "photo2" TEXT;
ALTER TABLE "Pets" ADD COLUMN "photo3" TEXT;
ALTER TABLE "Pets" ADD COLUMN "photo4" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pictures";
PRAGMA foreign_keys=on;
