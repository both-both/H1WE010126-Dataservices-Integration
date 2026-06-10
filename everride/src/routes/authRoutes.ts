import { Request, Response, Router } from "express";
import { authController } from "../controller/authController.js";
const router = Router();

// Route til liste af biler - base route i index.ts er /biler
router.post("/", authController.authenticate);

export const authRoutes = router;
