import { Request, Response, Router } from "express";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Vores afdelinger");
});

routes.get("/:landsdel/", (req: Request, res: Response) => {
  console.log(req.params);
  const { landsdel } = req.params;
  res.send(`Afdelinger i ${landsdel}`);
});

routes.get("/:landsdel/:by", (req: Request, res: Response) => {
  console.log(req.params);
  const { landsdel, by } = req.params;
  res.send(`Din lokale afdelingen i ${by}`);
});

export const departmentRoutes = routes;
