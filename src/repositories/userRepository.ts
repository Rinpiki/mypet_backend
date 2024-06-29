import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserRepository {
  async findAll() {
    return await prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(userData: { name: string; email: string; password: string }) {
    return await prisma.user.create({ data: userData });
  }

  async update(
    id: string,
    userData: { name?: string; email?: string; password?: string }
  ) {
    return await prisma.user.update({ where: { id }, data: userData });
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } });
  }
}

export default new UserRepository();
