import { Router } from "express";
import PetController from "../controllers/PetController";

const router = Router();

//Rotas de pets protegidas
router.get("/pet/:id", PetController.findPetById);
router.post("/pet", PetController.createPet);
router.put("/pet/:id", PetController.updatedPet);
router.delete("/pet/:id", PetController.deletPet);

//rotas de adm
router.get("/pets", PetController.findPet);

export default router;
