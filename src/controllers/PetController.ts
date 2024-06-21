import { Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PetController {
  async createPet(req: Request, res: Response) {
    const {
      userId,
      name,
      age,
      breed,
      sex,
      tutor,
      location,
      description,
      contacts,
    } = req.body;

    try {
      // Cria o pet relacionado ao usuário
      const newPet = await prisma.pets.create({
        data: {
          name,
          age,
          breed,
          sex,
          tutor,
          location,
          description,
          userId,
          contact: {
            create: contacts, // Adiciona os contatos
          },
        },
      });

      res.status(201).json(newPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar o pet" });
    }
  }
}

export default new PetController();
