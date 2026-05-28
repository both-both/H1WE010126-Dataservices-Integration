import { Request, Response, Router } from "express";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Biler til salg");
});

routes.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Her liste detajler over vores ${id}`);
});
routes.get("/:id/:model", (req: Request, res: Response) => {
  const { id, model } = req.params;
  res.send(`Detaljer om ${id} ${model}`);
});

export const carRoutes = routes;
