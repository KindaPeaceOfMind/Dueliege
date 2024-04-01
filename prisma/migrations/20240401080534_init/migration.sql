-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT
);

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
    CONSTRAINT "playerStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Maps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "body" TEXT
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user1" TEXT,
    "user2" TEXT,
    "active" TEXT,
    "mapId" INTEGER,
    CONSTRAINT "Sessions_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Maps" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
