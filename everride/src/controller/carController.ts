import { Request, Response } from "express";
import { prisma } from "../prisma.js";
// Defination af klasse
class CarController {
  // Metode til at hente alle biler
  getRecords = async (req: Request, res: Response) => {
    // Henter alle biler fra databasen
    try {
      const data = await prisma.car.findMany({
        select: {
          id: true,
          brand: true,
          model: true,
          year: true,
          price: true,
          isActive: true,
        },
        orderBy: {
          year: "desc",
        },
      });
      //returnerer data som JSOn
      return res.json(data);
    } catch (error) {
      console.error(`Fejl i API kald: ${error}`);
    }
  };

  //getRecord = async (req: Request, res: Response) => {};

  //createRecord = async (req: Request, res: Response) => {};
}
export const carController = new CarController();
