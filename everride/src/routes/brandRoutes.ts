import { Request, Response, Router } from "express";
import { carController } from "../controller/carController.js";
const router = Router();

// Route til liste af biler - base route i index.ts er /biler
router.get("/", carController.getRecords);
router.get("/:id", carController.getRecord);
router.post("/", carController.createRecord);
router.put("/:id", carController.updateRecord);
router.delete("/:id", carController.deleteRecord);

router.get("/:brand", (req: Request, res: Response) => {
  const { brand } = req.params;
  res.send(`Her liste detajler over vores ${brand}`);
});
router.get("/:brand/:model", (req: Request, res: Response) => {
  const { brand, model } = req.params;
  res.send(`Detaljer om ${brand} ${model}`);
});

export const carRoutes = router;
