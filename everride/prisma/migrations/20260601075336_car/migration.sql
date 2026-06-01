/*
  Warnings:

  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "vehicles";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "cars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" DECIMAL NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "fueltype" TEXT NOT NULL,
    "hasTowBar" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
