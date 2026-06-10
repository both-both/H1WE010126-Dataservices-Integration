import express from "express";
import type { Request, Response } from "express";
import { carRoutes } from "./routes/carRoutes.js";
import { brandRoutes } from "./routes/brandRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { categoryRoutes } from "./routes/categoryRoutes.js";
dotenv.config();

// sætter port
const port = process.env.PORT;
// Opretter express objekt
const app = express();
app.use(express.urlencoded({ extended: true }));
// Gør det muligt at modtage JSON data
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Forsiden");
});
// Tilføjer routes til applikationen
// anvender opdelte routes
app.use("/cars", carRoutes);
app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/login", authRoutes);

// 404 Error handling
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "404 - Bad endpoint", // object sent as json
  });
});
// Starter serverens
app.listen(port, () => {
  console.log(`server is running og port http://localhost:${port}`);
});
