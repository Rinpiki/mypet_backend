import petRepository from "../repositories/petRepository";
import {
  AllPets,
  CreatePet,
  DeletePet,
  PetInterface,
  UpdatePet,
  UpdateAvatarResponse,
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
      throw new Error("Pet não encontrado");
    }

    // Excluir o avatar antigo, se existir
    if (pet.avatar) {
      const oldAvatarPath = path.resolve(`.${pet.avatar}`);
      fs.unlink(oldAvatarPath, (err) => {
        if (err) console.error("Erro ao deletar avatar antigo:", err);
      });
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
      throw new Error("sem permisao");
    }

    return await petRepository.deletePet(id);
  }
}

export default new petService();
