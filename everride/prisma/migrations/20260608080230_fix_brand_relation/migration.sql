/*
  Warnings:

  - You are about to drop the column `brand` on the `car` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brandId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "fueltype" TEXT NOT NULL,
    "hasTowBar" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_car" ("brandId", "category", "createAt", "fueltype", "hasTowBar", "id", "isActive", "model", "price", "year") SELECT "brandId", "category", "createAt", "fueltype", "hasTowBar", "id", "isActive", "model", "price", "year" FROM "car";
DROP TABLE "car";
ALTER TABLE "new_car" RENAME TO "car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
