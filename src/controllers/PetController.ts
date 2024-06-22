import { Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PetController {
  async findPet(req: Request, res: Response) {
    try {
      const pets = await prisma.pets.findMany();
      res.status(201).json(pets);
    } catch (error) {
      response.status(400).json({ error: "Unable to find the pet" });
    }
  }
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
      res.status(500).json({ error: "Error creating the pet" });
    }
  }
  async updatedPet(req: Request, res: Response) {
    const { id } = req.params;
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
      const existingPet = await prisma.pets.findUnique({
        where: { id },
      });

      if (existingPet) {
        const updatedPet = await prisma.pets.update({
          where: { id: id },
          data: {
            userId,
            name,
            age,
            breed,
            sex,
            tutor,
            location,
            description,
            contact: {
              deleteMany: {},
              create: contacts,
            },
          },
        });
        res
          .status(200)
          .json({ message: "pet edited successfully", pet: updatedPet });
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating pet" });
    }
  }
}

export default new PetController();
