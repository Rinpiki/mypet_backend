import petRepository from "../repositories/petRepository";
import {
  AllPets,
  CreatePet,
  DeletePet,
  PetInterface,
  UpdatePet,
  PetAvatar,
} from "../interfaces/interfacePet";
import fs from "fs";
import path from "path";

class petService {
  async findPets(): Promise<AllPets[]> {
    return await petRepository.findAll();
  }
  async findPetById(id: string): Promise<PetInterface | null> {
    const existPet = await petRepository.findById(id);
    if (existPet === null) {
      throw new Error("Id not found");
    }
    return await petRepository.findById(id);
  }

  async findPetUserId(id: string): Promise<PetInterface[] | null> {
    const existPet = await petRepository.findPetUserId(id);
    if (existPet === null) {
      throw new Error("Id not found");
    }
    return await petRepository.findPetUserId(id);
  }

  async createPet(data: PetInterface): Promise<CreatePet> {
    return await petRepository.create(data);
  }

  async updatePet(data: PetInterface, id: string): Promise<UpdatePet> {
    const validId = await petRepository.findById(id);
    if (validId?.id !== id) {
      throw new Error("Id not found");
    }
    return await petRepository.update(data, id);
  }

  async updateAvatar(petId: string, avatarPath: string): Promise<PetAvatar> {
    // Buscar o pet pelo ID
    const pet = await petRepository.findById(petId);
    if (!pet) {
      throw new Error("Pet not found");
    }

    // Excluir o avatar antigo, se existir
    if (pet.avatar) {
      const oldAvatarPath = path.resolve(`.${pet.avatar}`);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlink(oldAvatarPath, (err) => {
          if (err) console.error("Error when deleting old avatar:", err);
        });
      } else {
        console.log("Old avatar file not found:", oldAvatarPath);
      }
    }

    // Atualizar o avatar com o novo caminho
    return petRepository.updateAvatar(petId, avatarPath);
  }

  async deletePet(id: string, userId: string): Promise<DeletePet> {
    const pet = await petRepository.findById(id);

    if (!pet) {
      throw new Error("Id not foundddd");
    }
    if (pet.userId !== userId) {
      throw new Error("without permission");
    }

    return await petRepository.deletePet(id);
  }
}

export default new petService();
