import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { admMiddleware } from "../middlewares/admMidldleware";

const router = Router();

// Rotas abertas
router.post("/user", UserController.createUser);
router.post("/login", UserController.userLogin);

//rotas comuns protegidas
router.use(authMiddleware);
router.put("/user/:id", UserController.editUser);
router.get("/profile", UserController.userProfile);
router.delete("/user/:id", UserController.deleteUser);

//rotas de adm
router.get("/users", admMiddleware, UserController.findUser);
export default router;
