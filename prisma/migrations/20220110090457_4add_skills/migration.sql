/*
  Warnings:

  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN "active" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Skills";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "playerStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hp" INTEGER,
    "armor" INTEGER,
    "stamina" INTEGER,
    "mana" INTEGER,
    "skills" TEXT,
    "buffs" TEXT,
    "lvl" INTEGER,
    "stats" TEXT,
    "userId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
