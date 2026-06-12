import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import { randomPrice, randomYear } from "../src/utils/seedHelpers";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const main = async () => {
  await prisma.user.deleteMany();
  await prisma.car.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

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
  console.log("Seed completed for users:", user);

  // Opretter mange brands i databasen
  const toyota = await prisma.brand.create({
    data: { name: "Toyota" },
  });
  const audi = await prisma.brand.create({
    data: { name: "Audi" },
  });
  const volvo = await prisma.brand.create({
    data: { name: "Volvo" },
  });
  const volkswagen = await prisma.brand.create({
    data: { name: "Volkswagen" },
  });
  const hyundai = await prisma.brand.create({
    data: { name: "Hyundai" },
  });
  console.log(
    "Seed completed for brands",
    toyota,
    audi,
    volvo,
    volkswagen,
    hyundai,
  );

  // Opretter kategorier i databasen
  const personbil = await prisma.category.create({
    data: { name: "Personbil" },
  });
  const SUV = await prisma.category.create({
    data: { name: "SUV" },
  });
  const bybil = await prisma.category.create({
    data: { name: "Bybil" },
  });
  const varevogn = await prisma.category.create({
    data: { name: "varevogn" },
  });
  const andre = await prisma.category.create({
    data: { name: "Andre" },
  });
  console.log(
    "Seed completed for category",
    personbil,
    SUV,
    bybil,
    varevogn,
    andre,
  );

  // Opretter mange drivmidler i databasen
  const benzin = await prisma.feature.create({
    data: { name: "Benzin" },
  });

  const diesel = await prisma.feature.create({
    data: { name: "Diesel" },
  });

  const hybrid = await prisma.feature.create({
    data: { name: "Hybrid" },
  });

  const el = await prisma.feature.create({
    data: { name: "El" },
  });
  console.log("Seed completed for feature:", benzin, diesel, hybrid, el);

  // Opretter biler i databasen
  const car1 = await prisma.car.create({
    data: {
      title: "Land Cruiser",
      year: randomYear(2014, 2025),
      brandId: Number(toyota.id),
      categoryId: Number(SUV.id),
      featureId: Number(diesel.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car2 = await prisma.car.create({
    data: {
      title: "Amazon",
      year: randomYear(2014, 2025),
      brandId: Number(volvo.id),
      categoryId: Number(andre.id),
      featureId: Number(benzin.id),
      price: randomPrice(100000, 560000),
      createdAt: new Date(),
    },
  });
  const car3 = await prisma.car.create({
    data: {
      title: "RS e-tron GT",
      year: randomYear(2014, 2025),
      brandId: Number(audi.id),
      categoryId: Number(SUV.id),
      featureId: Number(el.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car4 = await prisma.car.create({
    data: {
      title: "ID Buzz GTX",
      year: randomYear(2014, 2025),
      brandId: Number(volkswagen.id),
      categoryId: Number(varevogn.id),
      featureId: Number(el.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car5 = await prisma.car.create({
    data: {
      title: "EX40",
      year: randomYear(2014, 2025),
      brandId: Number(volvo.id),
      categoryId: Number(SUV.id),
      featureId: Number(el.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car6 = await prisma.car.create({
    data: {
      title: "Caddu Maxi",
      year: randomYear(2014, 2025),
      brandId: Number(volkswagen.id),
      categoryId: Number(varevogn.id),
      featureId: Number(diesel.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car7 = await prisma.car.create({
    data: {
      title: "A4",
      year: randomYear(2014, 2025),
      brandId: Number(audi.id),
      categoryId: Number(personbil.id),
      featureId: Number(benzin.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car8 = await prisma.car.create({
    data: {
      title: "Ioniq 5",
      year: randomYear(2014, 2025),
      brandId: Number(hyundai.id),
      categoryId: Number(SUV.id),
      featureId: Number(el.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car9 = await prisma.car.create({
    data: {
      title: "Kona",
      year: randomYear(2014, 2025),
      brandId: Number(hyundai.id),
      categoryId: Number(SUV.id),
      featureId: Number(el.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
  const car10 = await prisma.car.create({
    data: {
      title: "Auris",
      year: randomYear(2014, 2025),
      brandId: Number(toyota.id),
      categoryId: Number(bybil.id),
      featureId: Number(hybrid.id),
      price: randomPrice(80000, 560000),
      createdAt: new Date(),
    },
  });
};

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
