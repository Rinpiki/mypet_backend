import { PrismaClient, Prisma } from "@prisma/client";
import {
  PetInterface,
  ContactInterface,
  DeletePet,
  UpdatePet,
  CreatePet,
  AllPets,
  Pictures,
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
        picture: true,
      },
    });
  }
  async findPetUserId(id: string): Promise<PetInterface[] | null> {
    return await prisma.pets.findMany({
      where: { userId: id },
      include: {
        contact: true,
        picture: true,
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
    const { contact, picture, ...petData } = data;

    return await prisma.pets.update({
      where: { id },
      data: {
        ...petData, // Certifique-se de que petData contém apenas campos que você deseja atualizar
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
            : [], // Cria novos contatos
        },
        picture: {
          deleteMany: {}, // Se você deseja deletar todas as fotos antes de adicionar novas, use isso
          create: picture // Supondo que você tenha uma lista de novas fotos para adicionar
            ? picture.map((p: Pictures) => ({
                photo1: p.photo1,
                photo2: p.photo2,
                photo3: p.photo3,
                photo4: p.photo4,
                petId: id, // Certifique-se de associar a foto ao pet correto
              }))
            : [], // Se não houver novas fotos, não cria nenhuma
        },
      },
      include: {
        contact: true, // Inclui os contatos atualizados na resposta
        picture: true, // Inclui as fotos atualizadas na resposta
      },
    });
  }

  async updateAvatar(id: string, avatarPath: string): Promise<any> {
    return prisma.pets.update({
      where: { id },
      data: { avatar: avatarPath },
    });
  }

  async deletePet(id: string): Promise<DeletePet> {
    return await prisma.pets.delete({
      where: { id },
    });
  }
}

export default new PetRepository();
