import express from "express";
import type { Request, Response } from "express";
import { carRoutes } from "./routes/carRoutes.js";
import { departmentRoutes } from "./routes/departmentRoutes.js";
import { aboutRoutes } from "./routes/aboutRoutes.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import dotenv from "dotenv";
dotenv.config();

// sætter port
const port = process.env.PORT || "4000";
// Opretter express objekt
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Forsiden");
});

app.use("/biler", carRoutes);
app.use("/afdeling", departmentRoutes);
app.use("/om-os", aboutRoutes);
app.use("/kontakt", contactRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "404 - Bad endpoint", // object sent as json
  });
});

app.listen(port, () => {
  console.log(`server is running og port http://localhost:${port}`);
});
