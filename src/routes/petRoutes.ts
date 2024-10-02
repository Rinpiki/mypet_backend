import { Router } from "express";
import PetController from "../controllers/PetController";
import { admMiddleware } from "../middlewares/admMidldleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

//Rotas de pets protegidas
router.get("/mypets", authMiddleware, PetController.findPetsUserId);
router.post("/pet", authMiddleware, PetController.createPet);
router.put("/pet/:id", authMiddleware, PetController.updatedPet);
router.delete("/pet/:id", authMiddleware, PetController.deletPet);

//rotas de adm
router.get("/pets", admMiddleware, PetController.findPet);
router.get("/pet/:id", admMiddleware, PetController.findPetById);

export default router;
