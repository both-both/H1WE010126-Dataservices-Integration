import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { connect } from "node:http2";

// Defination af klasse
class CarController {
  // Metode til at hente alle biler
  getRecords = async (req: Request, res: Response) => {
    // Henter alle biler fra databasen
    try {
      const data = await prisma.car.findMany({
        select: {
          id: true,
          brand: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          title: true,
          year: true,
          price: true,
          featureId: true,
          isActive: true,
        },
        orderBy: {
          id: "asc",
        },
      });
      //returnerer data som JSON
      return res.json(data);
    } catch (error) {
      console.error(`Fejl i API kald: ${error}`);
      return res.status(500).json({ message: "Serverfejl" });
    }
  };

  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await prisma.car.findUnique({
        select: {
          id: true,
          title: true,
          year: true,
          featureId: true,
          isActive: true,
          createdAt: true,
        },
        // where clause - Leder efter noget hvor en betingelse er opfyldt
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
    const { categoryId, title, year, featureId, price, isActive, brandId } =
      req.body;

    if (!brandId || !title || !categoryId) {
      return res
        .status(400)
        .json({ message: "brandId, categoryId og title må ikke være tomme" });
    }
    try {
      const data = await prisma.car.create({
        data: {
          category: {
            connect: { id: Number(categoryId) },
          },
          title: title,
          year: Number(year),
          feature: {
            connect: {
              id: Number(featureId),
            },
          },
          price: Number(price),
          isActive: Boolean(JSON.parse(isActive)),
          brand: {
            connect: { id: Number(brandId) },
          },
        },
        include: {
          brand: {
            select: { id: true, name: true },
          },
          category: {
            select: { id: true, name: true },
          },
        },
      });
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Kan ikke oprette produkterne: ${error}`);
    }
  };
  updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { categoryId, brandId, title, year, featureId, isActive } = req.body;
    try {
      const data = await prisma.car.update({
        where: { id },
        data: {
          category: {
            connect: { id: Number(categoryId) },
          },
          brand: {
            connect: { id: Number(brandId) },
          },
          feature: {
            connect: { id: Number(featureId) },
          },
          title: title,
          year: Number(year),
          isActive: Boolean(isActive),
        },
      });
      res.send(data);
    } catch (error) {
      console.error(`Kunne ikke opdatere produktet ${error}`);
    }
  };
  deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const data = await prisma.car.delete({
        where: { id },
      });
      return res.status(200).json({
        message: `Bil nr ${id} er nu slettet`,
      });
    } catch (error) {
      console.error(`Kunne ikke slette produktet ${error}`);
    }
  };
}
export const carController = new CarController();
