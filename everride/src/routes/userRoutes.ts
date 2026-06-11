import { Router } from "express";
import { userController } from "../controller/userController.js";
import { authController } from "../controller/authController.js";
const router = Router();

// Route til liste af users
router.get("/", authController.authorize, userController.getRecords);
router.get("/:id", authController.authorize, userController.getRecord);
router.post("/", authController.authorize, userController.createRecord);
router.put("/:id", authController.authorize, userController.updateRecord);
router.delete("/:id", authController.authorize, userController.deleteRecord);

export const userRoutes = router;
