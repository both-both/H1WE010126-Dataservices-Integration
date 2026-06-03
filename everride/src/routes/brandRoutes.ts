import { Router } from "express";
import { brandController } from "../controller/brandController.js";
const router = Router();

// Route til liste af brands - base route i index.ts er /biler/brands
router.get("/", brandController.getRecords);
router.get("/:id", brandController.getRecord);
router.post("/", brandController.createRecord);
router.put("/:id", brandController.updateRecord);
router.delete("/:id", brandController.deleteRecord);

export const brandRoutes = router;
