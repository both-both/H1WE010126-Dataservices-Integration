import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

class AuthController {
  // Method generateToken
  generateToken = (
    user: { id: number },
    type: "access" | "refresh", // Definerer om det er en access eller refresh token
  ) => {
    //Henter secret key fra .env
    const key = process.env[`TOKEN_${type.toUpperCase()}_KEY`];

    // Henter udløbstid fra .env
    const expiresIn = process.env[`TOKEN_${type.toUpperCase()}EXPIRATION_SECS`];

    // Tjekker om værdier findes
    if (!key || !expiresIn) {
      throw new Error(`Missing env vars for ${type} token`);
    }
    // Beregner token udløbstid
    const exp = Math.floor(Date.now() / 1000) + Number(expiresIn);

    // Opretter JWT token
    return jwt.sign(
      {
        exp,
        data: {
          id: user.id,
        },
      },
      key,
    );
  };

  authenticate = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Tjekker om data findes
    if (!username || !password) {
      return res.status(400).json({
        message: "Missing crecentials",
      });
    }
    try {
      // Finder bruger i databasen
      const user = await prisma.user.findFirst({
        // where clause
        where: {
          email: username,
          isActive: true,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          password: true,
        },
      });

      // Returnerer unauthorized hvis bruger ikke findes
      if (!user) {
        return res.sendStatus(401);
      }

      // Sammenligner password med hash
      const isMatch = await bcrypt.compare(password, user.password);

      // Returnerer unauthorized hvis password er forkert
      if (!isMatch) {
        return res.sendStatus(401);
      }

      // Genererer access token
      const accessToken = this.generateToken(user, "access");

      // Returnerer token og brugerdata
      return res.json({
        accessToken,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    } catch (error: any) {
      // Returnerer serverfejl
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}

export const authController = new AuthController();
