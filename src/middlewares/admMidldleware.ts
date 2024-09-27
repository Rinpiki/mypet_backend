import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";

type jwtPayLoad = {
  id: string;
};

export const admMiddleware = async (
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
    if (!user.isAdmin) {
      return res.status(404).json({ error: "Authorization token required" });
    }
    req.user = userProfile;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
