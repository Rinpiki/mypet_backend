import petRepository from "../repositories/petRepository";
import {
  AllPets,
  CreatePet,
  DeletePet,
  PetInterface,
  UpdatePet,
} from "../interfaces/interfacePet";

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

  async deletePet(id: string): Promise<DeletePet> {
    const validId = await petRepository.findById(id);
    if (validId?.id !== id) {
      throw new Error("Id not found");
    }
    return await petRepository.deletePet(id);
  }
}

export default new petService();
