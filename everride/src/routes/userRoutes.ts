import { Router } from "express";
import { userController } from "../controller/userController.js";
const router = Router();

// Route til liste af users - base route i index.ts er /biler/users
router.get("/", userController.getRecords);
router.get("/:id", userController.getRecord);
router.post("/", userController.createRecord);
router.put("/:id", userController.updateRecord);
router.delete("/:id", userController.deleteRecord);

export const userRoutes = router;
