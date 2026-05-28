import { Request, Response, Router } from "express";
const routes = Router();

routes.get("/jylland", (req: Request, res: Response) => {
  res.send("Jylland");
});

routes.get("/fyn", (req: Request, res: Response) => {
  res.send("Fyn");
});

routes.get("/sjaelland", (req: Request, res: Response) => {
  res.send("Sjælland");
});

export const departmentRoutes = routes;
