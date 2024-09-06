import userRepository from "../repositories/userRepository";
import "dotenv/config";
import { CreateUser, EditUser, UserInterface } from "../types/typeUser";
import bcrypt from "bcrypt";
const saltRounds = parseInt(process.env.SALTROUDS || "");
class UserService {
  async findUsers(): Promise<UserInterface[]> {
    return await userRepository.findAll();
  }

  async createUser(userData: CreateUser): Promise<UserInterface> {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    return await userRepository.create(userData);
  }

  async editUser(id: string, userData: EditUser): Promise<UserInterface> {
    const existingId = await userRepository.findById(id);
    if (!existingId) {
      throw new Error("id not found");
    }
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    console.log(process.env.SALTROUDS);
    userData.password = hashedPassword;
    return await userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<UserInterface> {
    return await userRepository.delete(id);
  }
}

export default new UserService();
