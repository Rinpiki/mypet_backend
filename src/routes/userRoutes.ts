import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas de usuário
router.get("/users", UserController.findUser);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.editUser);
router.delete("/user/:id", UserController.deleteUser);
router.post("/login", UserController.userLogin);
router.get("/profile", authMiddleware, UserController.userProfile);

export default router;
