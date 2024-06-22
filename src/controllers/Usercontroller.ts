import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserController {
  async findUser(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ error: "Unable to find users" });
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    //verificar se o email esta no campo
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    //verificar se o email é valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email is invalid" });
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
          name: name,
          email: email,
          password: password,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "error when creating user" });
    }
  }

  async editUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      // Verificar se o email já está em uso por outro usuário
      if (email) {
        const emailInUse = await prisma.user.findUnique({
          where: { email },
        });

        if (emailInUse && emailInUse.id !== id) {
          return res.status(400).json({ error: "Email already in use" });
        }
      }

      if (existingUser) {
        const editedUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            name: name,
            email: email,
            password: password,
          },
        });
        res.status(200).json(editedUser);
      }
    } catch (error) {
      res.status(500).json({ error: "error when editing user" });
    }
  }

  async deletUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      res.status(500).json({ error: "error when deleting user" });
    }
  }
}

export default new UserController();
