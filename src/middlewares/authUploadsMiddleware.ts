import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import petService from "../services/petService";

type jwtPayLoad = {
  id: string;
};

export const authUploadsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Bearer token not found" });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as jwtPayLoad;

    const user = await userRepository.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _, ...userProfile } = user;

    req.user = userProfile;
    // Validação do ID do pet
    const { petId } = req.params;
    const pet = await petService.findPetById(petId); // Verifica se o pet existe

    if (!pet) {
      throw new Error("id not found11"); // Se o pet não existir, retorna erro
    }
    if (pet.userId !== user.id) {
      throw new Error("without permission");
    }

    // Se o pet for válido, continua para o próximo middleware (upload da imagem)
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
