import { Request, Response, Router } from "express";
import { authController } from "../controller/authController.js";
import { userController } from "../controller/userController.js";
const router = Router();

// Route til login
router.post("/", authController.authenticate);

export const authRoutes = router;
