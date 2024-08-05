import userRepository from "../repositories/userRepository";
import { UserInterface } from "../types/typeUser";

class UserService {
  async findUsers(): Promise<UserInterface[]> {
    return await userRepository.findAll();
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }
    return await userRepository.create(userData);
  }

  async editUser(
    id: string,
    userData: { name?: string; email?: string; password?: string }
  ) {
    if (userData.email) {
      const emailInUse = await userRepository.findByEmail(userData.email);
      if (emailInUse && emailInUse.id !== id) {
        throw new Error("Email already in use");
      }
    }
    return await userRepository.update(id, userData);
  }

  async deleteUser(id: string) {
    return await userRepository.delete(id);
  }
}

export default new UserService();
