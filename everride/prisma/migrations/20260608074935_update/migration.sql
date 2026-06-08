/*
  Warnings:

  - Added the required column `brandId` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brandId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "fueltype" TEXT NOT NULL,
    "hasTowBar" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_car" ("brand", "category", "createAt", "fueltype", "hasTowBar", "id", "isActive", "model", "price", "year") SELECT "brand", "category", "createAt", "fueltype", "hasTowBar", "id", "isActive", "model", "price", "year" FROM "car";
DROP TABLE "car";
ALTER TABLE "new_car" RENAME TO "car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
