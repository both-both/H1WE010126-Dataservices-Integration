import express from "express";
import type { Request, Response } from "express";
import { carRoutes } from "./routes/carRoutes.js";
import { departmentRoutes } from "./routes/departmentRoutes.js";
import { aboutRoutes } from "./routes/aboutRoutes.js";
import { contactRoutes } from "./routes/contactRoutes.js";

const app = express();
const port = 4000;

app.use("/biler-til-salg", carRoutes);
app.use("/afdelinger", departmentRoutes);
app.use("/om-os", aboutRoutes);
app.use("/kontakt", contactRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Forsiden");
});

app.get("/om-os", (req: Request, res: Response) => {
  res.send("Om os");
});
app.get("/kontakt", (req: Request, res: Response) => {
  res.send("Kontakt");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "404 - Bad endpoint", // object sent as json
  });
});

app.listen(port, () => {
  console.log(`server is running og port http://localhost:${port}`);
});
