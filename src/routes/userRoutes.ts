import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { admMiddleware } from "../middlewares/admMidldleware";

const router = Router();

// Rotas abertas
router.post("/user", UserController.createUser);
router.post("/login", UserController.userLogin);

//rotas comuns protegidas
router.put("/user/:id", authMiddleware, UserController.editUser);
router.get("/profile", authMiddleware, UserController.userProfile);
router.delete("/user/:id", authMiddleware, UserController.deleteUser);

//rotas de adm
router.get("/users", admMiddleware, UserController.findUser);
export default router;
