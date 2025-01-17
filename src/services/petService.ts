import petRepository from "../repositories/petRepository";
import { getKeyByValue } from "./../utils/getKeyByValue";
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
    if (!existPet || existPet.length === 0) {
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

  async uploadImagens(
    petId: string,
    segment: string,
    avatarPath: string
  ): Promise<PetAvatar> {
    const fieldName = `photo${segment}` as keyof PetInterface;
    // Buscar o pet pelo ID
    const pet = await petRepository.findById(petId);
    if (!pet) {
      throw new Error("Pet not found");
    }

    // Excluir o avatar antigo, se existir
    if (pet[fieldName]) {
      const oldImagensPath = path.resolve(`.${pet[fieldName]}`);
      if (fs.existsSync(oldImagensPath)) {
        fs.unlink(oldImagensPath, (err) => {
          if (err) console.error("Error when deleting old avatar:", err);
        });
      } else {
        console.log("Old avatar file not found:", oldImagensPath);
      }
    }

    return petRepository.uploadImagens(petId, segment, avatarPath);
  }

  async deletePet(id: string, userId: string): Promise<DeletePet> {
    const pet = await petRepository.findById(id);

    if (!pet) {
      throw new Error("Id not found");
    }
    if (pet.userId !== userId) {
      throw new Error("without permission");
    }
    const { avatar, photo1, photo2, photo3, photo4 } = pet;
    const petPhotos = [avatar, photo1, photo2, photo3, photo4];
    for (const photo of petPhotos) {
      if (!photo) continue;
      const oldImagensPath = path.resolve(`.${photo}`);
      if (fs.existsSync(oldImagensPath)) {
        fs.unlink(oldImagensPath, (err) => {
          if (err) console.error("Error when deleting old avatar:", err);
        });
      } else {
        console.log("Old avatar file not found:", oldImagensPath);
      }
    }

    return await petRepository.deletePet(id);
  }

  async deleteImages(pathImage: string, idUser: string): Promise<UpdatePet> {
    const pet = await petRepository.findByImagePath(pathImage);
    if (!pet) {
      throw new Error("image not exist");
    }

    if (pet.userId !== idUser) {
      throw new Error("without permission");
    }

    const key = getKeyByValue(pet, pathImage);

    if (!key) {
      throw new Error("key not exist");
    }
    const oldImagensPath = path.resolve(`.${pathImage}`);
    if (fs.existsSync(oldImagensPath)) {
      fs.unlink(oldImagensPath, (err) => {
        if (err) console.error("Error when deleting old avatar:", err);
      });
    } else {
      console.log("Old avatar file not found:", oldImagensPath);
    }
    return await petRepository.deleteImage(pet.id, key);
  }
}

export default new petService();
