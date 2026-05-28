import express from "express";
import type { Request, Response } from "express";
const app = express();
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Forsiden");
});

app.get("/biler-til-salg", (req: Request, res: Response) => {
  res.send("Biler til salg");
});

app.get("/afdelinger", (req: Request, res: Response) => {
  res.send("Afdelinger");
});
app.get("/om-os", (req: Request, res: Response) => {
  res.send("Om os");
});
app.get("/kontakt", (req: Request, res: Response) => {
  res.send("Kontakt");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "404 - Bad endpoint", // object sent as json
  });
});

app.listen(port, () => {
  console.log(`server is running og port http://localhost:${port}`);
});
