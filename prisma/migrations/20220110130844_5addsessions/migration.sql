/*
  Warnings:

  - You are about to drop the `_SessionsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN "user1" TEXT;
ALTER TABLE "Sessions" ADD COLUMN "user2" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SessionsToUser";
PRAGMA foreign_keys=on;
