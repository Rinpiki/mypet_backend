import { Request, Response } from "express";
import userService from "../services/userService";
import useSchema from "../joiSchema/useSchema";

class UserController {
  async findUser(req: Request, res: Response) {
    try {
      const users = await userService.findUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  async createUser(req: Request, res: Response) {
    const { error, value } = useSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = value;

    try {
      const user = await userService.createUser({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  async editUser(req: Request, res: Response) {
    const { error, value } = useSchema.validate(req.body);
    const { id } = req.params;
    const { name, email, password } = value;

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const editedUser = await userService.editUser(id, {
        name,
        email,
        password,
      });
      res.status(200).json(editedUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await userService.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }
}

export default new UserController();
