import { PrismaClient } from "@prisma/client";
import { CreateUser, EditUser, UserInterface } from "../types/typeUser";
const prisma = new PrismaClient();

class UserRepository {
  async findAll(): Promise<UserInterface[]> {
    return await prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(userData: CreateUser): Promise<UserInterface> {
    return await prisma.user.create({ data: userData });
  }

  async update(id: string, userData: EditUser): Promise<UserInterface> {
    return await prisma.user.update({ where: { id }, data: userData });
  }

  async delete(id: string): Promise<UserInterface> {
    return await prisma.user.delete({ where: { id } });
  }
}

export default new UserRepository();
