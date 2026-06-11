import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcrypt";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const main = async () => {
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      firstname: "Test",
      lastname: "Bruger",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),
      role: "USER",
      isActive: true,
    },
  });
};
