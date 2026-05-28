import { Request, Response, Router } from "express";
const routes =  Router()

routes.get("/", (req: Request, res: Response) => {
  res.send("Biler til salg");
})

routes.get("/detaljer", (req: Request, res: Response) => {
    res.send("Detaljer")
})

export const carRoutes = routes