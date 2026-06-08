import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma.js";

// Defination af klasse
class UserController {
  // Metode til at hente alle biler
  getRecords = async (req: Request, res: Response) => {
    // Henter alle biler fra databasen
    try {
      const data = await prisma.user.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          password: true,
          role: true,
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
      const data = await prisma.user.findUnique({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          password: true,
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
    const { firstname, lastname, email, password, role, isActive } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "firstname, lastname email og password må ikke være tomme",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const data = await prisma.user.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashedPassword,
          role: role,
          isActive: Boolean(JSON.parse(isActive)),
        },
      });
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Kan ikke oprette bruger: ${error}`);
    }
  };
  updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { firstname, lastname, email, password, isActive } = req.body;
    try {
      const data = await prisma.user.update({
        where: { id },
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          isActive: Boolean(JSON.parse(isActive)),
        },
      });
      res.send(data);
    } catch (error) {
      console.error(`Kunne ikke opdatere brugers ${error}`);
    }
  };
  deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const data = await prisma.user.delete({
        where: { id },
      });
      return res.status(200).json({
        message: `bruger med id: ${id} er nu slettet`,
      });
    } catch (error) {
      console.error(`Kunne ikke slette brugeren ${error}`);
    }
  };
}
export const userController = new UserController();
