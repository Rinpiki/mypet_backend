import { Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
const prisma = new PrismaClient();

class UserController {
  async findUser(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ error: "nao foi possivel encontrar os usuarios" });
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    //verificar se o email esta no campo
    if (!email) {
      return res.status(400).json({ error: "Email é necessário" });
    }

    //verificar se o email é valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email é invalido" });
    }

    try {
      //verificar se o email já esta cadastrado
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email already is use" });
      }

      //criar novo usuário
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      response.status(500).json({ error: "error ao criar usuario" });
    }
  }
}

export default new UserController();
