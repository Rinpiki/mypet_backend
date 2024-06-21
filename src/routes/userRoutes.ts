import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

// Rotas de usuário
router.get("/users", UserController.findUser);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.editUser);
router.delete("/user/:id", UserController.deletuser);

export default router;
