import petRepository from "../repositories/petRepository";
import {
  AllPets,
  CreatePet,
  DeletePet,
  PetInterface,
  UpdatePet,
} from "../interfaces/interfacePet";
import { valid } from "joi";

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
