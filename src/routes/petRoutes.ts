import { Router } from "express";
import PetController from "../controllers/PetController";

const router = Router();

// Rotas de pets
router.get("/pets", PetController.findPet);
router.post("/pet", PetController.createPet);
router.put("/pet/:id", PetController.updatedPet);

export default router;
