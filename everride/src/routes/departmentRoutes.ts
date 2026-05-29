import { Request, Response, Router } from "express";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Vores afdelinger");
});

routes.get("/:region/", (req: Request, res: Response) => {
  console.log(req.params);
  const { region } = req.params;
  res.send(`Afdelinger i ${region}`);
});

routes.get("/:region/:city", (req: Request, res: Response) => {
  console.log(req.params);
  const { region, city } = req.params;
  res.send(`Din lokale afdelingen i ${city}`);
});

export const departmentRoutes = routes;
