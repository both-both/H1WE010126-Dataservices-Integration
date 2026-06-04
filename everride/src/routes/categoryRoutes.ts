import { Router } from "express";
import { categoryController } from "../controller/categoryController.js";
const router = Router();

// Route til liste af kategorier - base route i index.ts er /categories

router.get("/", categoryController.getRecords);
router.get("/:id", categoryController.getRecord);
router.post("/", categoryController.createRecord);
router.put("/:id", categoryController.updateRecord);
router.delete("/:id", categoryController.deleteRecord);

export const categoryRoutes = router;
