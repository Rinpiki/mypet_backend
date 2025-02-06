import { Request, Response } from "express";
import userService from "../services/userService";
import useSchema from "../joiSchema/useSchema";
import loginSchema from "../joiSchema/loginsSchema";
import forgotPasswordSchema from "../joiSchema/forgotPasswordSchema";
import resetPasswordSchema from "../joiSchema/resetPasswordSchema";

class UserController {
  async findUser(req: Request, res: Response): Promise<void> {
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

  async createUser(req: Request, res: Response): Promise<void> {
    const { error, value } = useSchema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name, email, password } = value;

    try {
      const user = await userService.createUser({
        name,
        email,
        password,
      });
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  async editUser(req: Request, res: Response): Promise<void> {
    const { error, value } = useSchema.validate(req.body);
    const { id } = req.params;
    const { name, email, password } = value;

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
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

  async deleteUser(req: Request, res: Response): Promise<void> {
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

  async userLogin(req: Request, res: Response): Promise<void> {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    try {
      const login = await userService.login(value);
      res.status(200).json(login);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  async userProfile(req: Request, res: Response): Promise<void> {
    const id = req.user?.id;
    try {
      const profile = await userService.getProfile(id ?? "");
      res.status(200).json(profile);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  async userForgotPassword(req: Request, res: Response): Promise<void> {
    const { error, value } = forgotPasswordSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { email } = value;

    try {
      const emailStatus = await userService.userForgotPassword(email);
      res.status(201).json(emailStatus);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  async userResetPassword(req: Request, res: Response): Promise<void> {
    const { error, value } = resetPasswordSchema.validate(req.body);
    const { token, newPassword } = value;
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    try {
      const passwordStatus = await userService.userResetPassword(
        token,
        newPassword
      );
      res.status(201).json(passwordStatus);
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
