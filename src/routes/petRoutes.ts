import { Router } from "express";
import PetController from "../controllers/PetController";

const router = Router();

// Rotas de pets
router.get("/pets", PetController.findPet);
router.get("/pet/:id", PetController.findPetById);
router.post("/pet", PetController.createPet);
router.put("/pet/:id", PetController.updatedPet);
router.delete("/pet/:id", PetController.deletPet);

export default router;
