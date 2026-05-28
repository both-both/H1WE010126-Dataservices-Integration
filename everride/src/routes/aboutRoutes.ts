import { Request, Response, Router } from "express";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Om os");
});

export const aboutRoutes = routes;
