import { Request, Response, Router } from "express";
import { carController } from "../controller/carController.js";
const routes = Router();

routes.get("/", carController.getRecords);
//carRoutes get.records
//res.send("Biler til salg");

routes.get("/:brand", (req: Request, res: Response) => {
  const { brand } = req.params;
  res.send(`Her liste detajler over vores ${brand}`);
});
routes.get("/:brand/:model", (req: Request, res: Response) => {
  const { brand, model } = req.params;
  res.send(`Detaljer om ${brand} ${model}`);
});

export const carRoutes = routes;
