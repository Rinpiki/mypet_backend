import { Pets, Prisma } from "@prisma/client";
import petRepository from "../repositories/petRepository";
import { PetInterface } from "../types";

class petService {
  async findPets(): Promise<Pets[]> {
    return await petRepository.findAll();
  }
  async findPetById(id: string): Promise<PetInterface | null> {
    try {
      const existPet = await petRepository.findById(id);
      if (existPet === null) {
        throw new Error("Id not found");
      }
      return await petRepository.findById(id);
    } catch (error) {
      console.error("Error in FindPet:", error);
      throw error;
    }
  }

  async createPet(data: PetInterface): Promise<Pets> {
    return await petRepository.create(data);
  }

  async updatePet(data: PetInterface, id: string): Promise<Pets> {
    try {
      const validId = await petRepository.findById(id);
      if (validId?.id !== id) {
        throw new Error("Id not found");
      }
      return await petRepository.update(data, id);
    } catch (error) {
      console.error("Error in updatePet:", error);
      throw error;
    }
  }

  async deletePet(id: string) {
    try {
      const validId = await petRepository.findById(id);
      if (validId?.id !== id) {
        throw new Error("Id not found");
      }
      return await petRepository.deletePet(id);
    } catch (error) {
      console.error("Error in updatePet:", error);
      throw error;
    }
  }
}

export default new petService();
