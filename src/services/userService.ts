import userRepository from "../repositories/userRepository";
import * as T from "../interfaces/interfaceUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import petRepository from "../repositories/petRepository";

type jwtPayLoad = {
  id: string;
};

const saltRounds = parseInt(process.env.SALTROUDS || "");

class UserService {
  async findUsers(): Promise<T.UserInterface[]> {
    return await userRepository.findAll();
  }

  async createUser(userData: T.CreateUser): Promise<T.UserInterface> {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    return await userRepository.create(userData);
  }

  async editUser(id: string, userData: T.EditUser): Promise<T.UserInterface> {
    const existingId = await userRepository.findById(id);
    if (!existingId) {
      throw new Error("id not found");
    }
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    return await userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<T.UserInterface> {
    return await userRepository.delete(id);
  }

  async login(userData: T.CreateUser): Promise<T.loginInterface> {
    const user = await userRepository.findByEmail(userData.email);
    if (!user) {
      throw new Error("E-mail ou senha inválidos");
    }

    const verifyPass = await bcrypt.compare(userData.password, user.password);
    if (!verifyPass) {
      throw new Error("E-mail ou senha inválidos");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS || "", {
      expiresIn: "8h",
    });
    const { password: _, ...userLogin } = user;

    return {
      user: userLogin,
      token: token,
    };
  }
  async getProfile(id: string): Promise<T.ProfileUser> {
    const user = await userRepository.findById(id);
    const pet = await petRepository.findByIdUser(id);
    if (!user) {
      throw new Error("user not exist");
    }
    if (!pet) {
      throw new Error("pet not exist");
    }
    return {
      user: user,
      pets: pet,
    };
  }
}

export default new UserService();
