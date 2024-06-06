import express from "express";
import { PrismaClient } from "@prisma/client";
import router from "./routes";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(router);

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
