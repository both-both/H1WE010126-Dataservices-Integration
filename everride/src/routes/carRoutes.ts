import { Request, Response, Router } from "express";
import { carController } from "../controller/carController.js";
const router = Router();

// Route til liste af biler - base route i index.ts er /biler
router.get("/", carController.getRecords);
router.get("/:id", carController.getRecord);
router.post("/", carController.createRecord);
router.put("/:id", carController.updateRecord);
router.delete("/:id", carController.deleteRecord);

export const carRoutes = router;
