import { PrismaClient, Prisma } from "@prisma/client";
import {
  PetInterface,
  ContactInterface,
  DeletePet,
  UpdatePet,
  CreatePet,
  AllPets,
  PetAvatar,
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

  async findByImagePath(imagePath: string): Promise<any> {
    return await prisma.pets.findFirst({
      where: {
        OR: [
          { avatar: imagePath },
          { photo1: imagePath },
          { photo2: imagePath },
          { photo3: imagePath },
          { photo4: imagePath },
        ],
      },
      include: {
        contact: true,
      },
    });
  }

  async findPetUserId(id: string): Promise<PetInterface[] | null> {
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
      },
      include: {
        contact: true, // Inclui os contatos atualizados na resposta
      },
    });
  }

  async updateAvatar(id: string, avatarPath: string): Promise<PetAvatar> {
    return prisma.pets.update({
      where: { id },
      data: { avatar: avatarPath },
    });
  }
  async deleteImage(id: string, imagePath: string): Promise<any> {
    return prisma.pets.update({
      where: { id },
      data: { [imagePath]: "" },
    });
  }
  async uploadImagens(
    id: string,
    segment: string,
    avatarPath: string
  ): Promise<PetAvatar> {
    const fieldName = `photo${segment}`;

    return prisma.pets.update({
      where: { id },
      data: { [fieldName]: avatarPath },
    });
  }

  async deletePet(id: string): Promise<DeletePet> {
    return await prisma.pets.delete({
      where: { id },
    });
  }
}

export default new PetRepository();
