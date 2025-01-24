import { Router } from "express";
import userRoutes from "./userRoutes";
import petRoutes from "./petRoutes";

const router: Router = Router();

// Usando as rotas separadas
router.use(userRoutes);
router.use(petRoutes);

export default router;
