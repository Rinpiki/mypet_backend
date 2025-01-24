import { Request, Response, response } from "express";
import petRepository from "../repositories/petRepository";
import petService from "../services/petService";
import petSchema from "../joiSchema/petSchema";

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
    const userId = req.params;
    try {
      const pets = await petService.findPetUserId(userId.userid);
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
    petData.userId = req.user?.id;
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
    petData.userId = req.user?.id;
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
      return;
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    try {
      // Chamar o serviço para atualizar o avatar
      const updatedPet = await petService.updateAvatar(petId, avatarPath);
      res
        .status(200)
        .json({ message: "Avatar atualizado com sucesso", pet: updatedPet });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async uploadImagens(req: Request, res: Response): Promise<void> {
    const { segment, petId } = req.params;

    if (!req.file) {
      res.status(400).json({ error: "Arquivo de avatar não enviado" });
      return;
    }

    const avatarPath = `/uploads/imagens/${req.file?.filename}`;
    try {
      // Chamar o serviço para postar imagens
      const updatedPet = await petService.uploadImagens(
        petId,
        segment,
        avatarPath
      );
      res.status(200).json({ message: "imagem postada", pet: updatedPet });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async deletePet(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      const deletedPet = await petService.deletePet(id, userId ?? "");
      res
        .status(200)
        .json({ message: "Pet deleted successfully", pet: deletedPet });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async deleteImages(req: Request, res: Response): Promise<void> {
    const { imagePath } = req.body;
    const idUser = req.user?.id;

    if (!idUser) {
      res.status(400).json({ error: "without permission" });
      return;
    }
    try {
      const result = await petService.deleteImages(imagePath, idUser);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}

export default new PetController();
