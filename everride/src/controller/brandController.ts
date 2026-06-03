import { Request, response, Response } from "express";
import { prisma } from "../prisma.js";

// Defination af klasse
class BrandController {
  // Metode til at hente alle brands
  getRecords = async (req: Request, res: Response) => {
    // Henter alle brands fra databasen
    try {
      const data = await prisma.brand.findMany({
        select: {
          id: true,
          name: true,
          logo: true,
        },
        orderBy: {
          id: "asc",
        },
      });
      //returnerer data som JSON
      return res.json(data);
    } catch (error) {
      console.error(`Fejl i API kald: ${error}`);
    }
  };
  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const data = await prisma.brand.findUnique({
        select: {
          id: true,
          name: true,
          logo: true,
        },
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Kunne ikke oprette produktet ${error}`);
    }
  };
  createRecord = async (req: Request, res: Response) => {
    const { name, logo } = req.body;

    if (!name || !logo) {
      console.error("Nave og log må ikke være tomme");
    }
    try {
      const data = await prisma.brand.create({
        data: {
          name: name,
          logo: logo,
        },
      });
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Kan ikke oprette brands: ${error}`);
    }
  };
  updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, logo } = req.body;
    try {
      const data = await prisma.brand.update({
        where: { id },
        data: {
          name: name,
          logo: logo,
        },
      });
      res.send(data);
    } catch (error) {
      console.error(`Kunne ikke opdatere brandet
         ${error}`);
    }
  };
  deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const data = await prisma.brand.delete;
      ({
        where: { id },
      });
      return res.status(200).json({
        message: `Brand nr ${id} er nu slettet`,
      });
    } catch (error) {
      console.error(`Kunne ikke slette produktet ${error}`);
    }
    n;
  };
}

// Eksporterer en instans af controller klassen
export const brandController = new BrandController();
