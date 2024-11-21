import { Request, Response, response } from "express";
import petRepository from "../repositories/petRepository";
import petService from "../services/petService";
import petSchema from "../joiSchema/petSchema";
import { promises } from "dns";

class PetController {
  async findPet(req: Request, res: Response): Promise<void> {
    try {
      const pets = await petRepository.findAll();
      res.status(201).json(pets);
    } catch (error) {
      response.status(400).json({ error: "Unable to find the pet" });
    }
  }

  async findPetsUserId(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    try {
      const pets = await petService.findPetUserId(userId ?? "");
      res.status(200).json(pets);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Id not found") {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
      }
    }
  }

  async findPetById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const pet = await petService.findPetById(id);
      res.status(200).json(pet);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Id not found") {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
      }
    }
  }

  async createPet(req: Request, res: Response): Promise<void> {
    const petData = req.body;
    petData.userId = req.user.id;
    const { error, value } = petSchema.validate(petData);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    try {
      const newPet = await petService.createPet(value);
      res.status(201).json(newPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating the pet" });
    }
  }

  async updatedPet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const petData = req.body;
    petData.userId = req.user.id;
    const { error, value } = petSchema.validate(petData);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    try {
      const updatedPet = await petService.updatePet(value, id);
      res
        .status(200)
        .json({ message: "pet edited successfully", pet: updatedPet });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Id not found") {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    }
  }

  async updateAvatar(req: Request, res: Response): Promise<void> {
    const { petId } = req.params;
    if (!req.file) {
      res.status(400).json({ error: "Arquivo de avatar não enviado" });
    }
    const avatarPath = `/uploads/avatars/${req.file?.filename}`;

    try {
      // Chamar o serviço para atualizar o avatar
      const updatedPet = await petService.updateAvatar(petId, avatarPath);
      res
        .status(200)
        .json({ message: "Avatar atualizado com sucesso", pet: updatedPet });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deletPet(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const { id } = req.params;

    try {
      const deletedPet = await petService.deletePet(id, userId ?? "");
      res
        .status(200)
        .json({ message: "Pet deleted successfully", pet: deletedPet });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new PetController();
