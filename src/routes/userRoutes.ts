import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { admMiddleware } from "../middlewares/admMidldleware";

const router = Router();

// Rotas abertas
router.post("/login", UserController.userLogin);
router.post("/user", UserController.createUser);

//rotas comuns protegidas
router.use(authMiddleware);
router.put("/user/:id", UserController.editUser);
router.get("/profile", UserController.userProfile);
router.delete("/user/:id", UserController.deleteUser);

//rotas de adm
router.get("/users", admMiddleware, UserController.findUser);
export default router;
