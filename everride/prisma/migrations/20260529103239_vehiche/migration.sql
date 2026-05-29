/*
  Warnings:

  - You are about to drop the column `class` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `category` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fueltype` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicles" (
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
INSERT INTO "new_vehicles" ("brand", "createAt", "hasTowBar", "id", "isActive", "model", "price") SELECT "brand", "createAt", "hasTowBar", "id", "isActive", "model", "price" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
