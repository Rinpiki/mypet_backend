import { Request, Response, response } from "express";
import petRepository from "../repositories/petRepository";
import petService from "../services/petService";
import petSchema from "../joiSchema/petSchema";

class PetController {
  async findPet(req: Request, res: Response) {
    try {
      const pets = await petRepository.findAll();
      res.status(201).json(pets);
    } catch (error) {
      response.status(400).json({ error: "Unable to find the pet" });
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

  async createPet(req: Request, res: Response) {
    const { error, value } = petSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      // Cria o pet relacionado ao usuário
      const newPet = await petService.createPet(value);

      res.status(201).json(newPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating the pet" });
    }
  }

  async updatedPet(req: Request, res: Response) {
    const { id } = req.params;
    const { error, value } = petSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
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

  async deletPet(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedPet = await petService.deletePet(id);
      res
        .status(200)
        .json({ message: "Pet deleted successfully", pet: deletedPet });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Id not found" });
    }
  }
}

export default new PetController();
