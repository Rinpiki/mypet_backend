import { Router } from "express";
import PetController from "../controllers/PetController";

const router = Router();

// Rotas de pets
router.post("/pets", PetController.createPet);

export default router;
