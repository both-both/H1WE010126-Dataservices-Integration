import { Request, response, Response } from "express";
import { prisma } from "../prisma.js";

// Defination af klasse
class CategoryController {
  // Metode til at hente alle brands
  getRecords = async (req: Request, res: Response) => {
    // Henter alle brands fra databasen
    try {
      const data = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
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
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Kunne ikke oprette emne ${error}`);
    }
  };

  createRecord = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
      console.error("Navn må ikke være tomt");
    }
    try {
      const data = await prisma.category.create({
        data: {
          name: name,
        },
      });
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Kan ikke oprette kategori`);
    }
  };
  updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
      const data = await prisma.category.update({
        where: { id },
        data: {
          name: name,
        },
      });
      res.send(data);
    } catch (error) {
      console.error(`Kunne ikke opdatere kategorien ${error}`);
    }
  };
  deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const data = await prisma.category.delete({
        where: { id },
      });
      return res.status(200).json({
        message: `kategori nr ${id} er nu slettet`,
      });
    } catch (error) {
      console.error(`Kunne ikke slette kategorien ${error}`);
    }
  };
}

// Eksporterer en instans af controller klassen
export const categoryController = new CategoryController();
