-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "featureId" INTEGER,
    CONSTRAINT "car_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "car_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_car" ("brandId", "categoryId", "createdAt", "featureId", "id", "isActive", "price", "title", "year") SELECT "brandId", "categoryId", "createdAt", "featureId", "id", "isActive", "price", "title", "year" FROM "car";
DROP TABLE "car";
ALTER TABLE "new_car" RENAME TO "car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
