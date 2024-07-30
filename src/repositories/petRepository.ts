import { PrismaClient, Pets, Prisma } from "@prisma/client";
import { PetInterface, ContactInterface } from "../types/index";

const prisma = new PrismaClient();

class PetRepository {
  async findAll() {
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
  async create(data: any): Promise<Pets> {
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
  async update(data: PetInterface, id: string): Promise<Pets> {
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
  async deletePet(id: string) {
    return await prisma.pets.delete({
      where: { id },
    });
  }
}

export default new PetRepository();
