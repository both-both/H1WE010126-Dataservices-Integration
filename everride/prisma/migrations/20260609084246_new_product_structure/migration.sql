/*
  Warnings:

  - You are about to drop the column `logo` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `fueltype` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `hasTowBar` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `car` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `car` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.
  - Added the required column `featureId` to the `car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "features" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "car_feature_rel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,
    CONSTRAINT "car_feature_rel_productId_fkey" FOREIGN KEY ("productId") REFERENCES "car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "car_feature_rel_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_brands" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT
);
INSERT INTO "new_brands" ("id", "name") SELECT "id", "name" FROM "brands";
DROP TABLE "brands";
ALTER TABLE "new_brands" RENAME TO "brands";
CREATE TABLE "new_car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "car_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "car_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_car" ("brandId", "categoryId", "id", "isActive", "price", "year") SELECT "brandId", "categoryId", "id", "isActive", "price", "year" FROM "car";
DROP TABLE "car";
ALTER TABLE "new_car" RENAME TO "car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
