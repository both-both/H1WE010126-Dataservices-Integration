/*
  Warnings:

  - You are about to drop the column `productId` on the `car_feature_rel` table. All the data in the column will be lost.
  - Added the required column `carId` to the `car_feature_rel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_car_feature_rel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,
    CONSTRAINT "car_feature_rel_carId_fkey" FOREIGN KEY ("carId") REFERENCES "car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "car_feature_rel_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_car_feature_rel" ("featureId", "id") SELECT "featureId", "id" FROM "car_feature_rel";
DROP TABLE "car_feature_rel";
ALTER TABLE "new_car_feature_rel" RENAME TO "car_feature_rel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
