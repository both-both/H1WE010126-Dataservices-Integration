import express from "express";
import type { Request, Response } from "express";
import { carRoutes } from "./routes/carRoutes.js";
import { brandRoutes } from "./routes/brandRoutes.js";
import { departmentRoutes } from "./routes/departmentRoutes.js";
import { aboutRoutes } from "./routes/aboutRoutes.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import dotenv from "dotenv";
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
app.use("/biler", carRoutes);
app.use("/brands", brandRoutes);
/* app.use("/afdeling", departmentRoutes);
app.use("/om-os", aboutRoutes);
app.use("/kontakt", contactRoutes); */

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
