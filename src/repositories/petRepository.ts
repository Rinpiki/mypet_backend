import { PrismaClient, Prisma } from "@prisma/client";
import {
  PetInterface,
  ContactInterface,
  DeletePet,
  UpdatePet,
  CreatePet,
  AllPets,
} from "../interfaces/interfacePet";

const prisma = new PrismaClient();

class PetRepository {
  async findAll(): Promise<AllPets[]> {
    return await prisma.pets.findMany();
  }

  async findById(id: string): Promise<PetInterface | null> {
    return await prisma.pets.findUnique({
      where: { id },
      include: {
        contact: true,
      },
    });
  }
  async findByIdUser(id: string): Promise<PetInterface[] | null> {
    return await prisma.pets.findMany({
      where: { userId: id },
      include: {
        contact: true,
      },
    });
  }

  async create(data: any): Promise<CreatePet> {
    return await prisma.pets.create({
      data: {
        ...data,
        contact: data.contact
          ? {
              create: data.contact as Prisma.ContactCreateWithoutAuthorInput[],
            }
          : undefined,
      },
    });
  }

  async update(data: PetInterface, id: string): Promise<UpdatePet> {
    const { contact, ...petData } = data;

    return await prisma.pets.update({
      where: { id },
      data: {
        ...petData,
        contact: {
          deleteMany: {}, // Deleta todos os contatos anteriores
          create: contact
            ? contact.map((c: ContactInterface) => ({
                whatsapp: c.whatsapp,
                instagram: c.instagram,
                tiktok: c.tiktok,
                facebook: c.facebook,
                x: c.x,
              }))
            : [], // Cria os novos contatos
        },
      },
      include: {
        contact: true, // Inclui os contatos atualizados na resposta
      },
    });
  }

  async deletePet(id: string): Promise<DeletePet> {
    return await prisma.pets.delete({
      where: { id },
    });
  }
}

export default new PetRepository();
