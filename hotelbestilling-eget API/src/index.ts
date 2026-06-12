import express, { Request, Response } from "express";
import { guestRoutes } from "./routes/guestRoutes.js";
import dotenv from "dotenv";

const port = process.env.PORT || 4000;
const app = express();
dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send("Hej verden");
});

app.use("/guests", guestRoutes);
console.log("gæsteside");

app.listen(4242, () => {
  console.log("Express server kører...");
});
