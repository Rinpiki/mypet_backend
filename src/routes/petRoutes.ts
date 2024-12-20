import { Router } from "express";
import PetController from "../controllers/PetController";
import { admMiddleware } from "../middlewares/admMidldleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploadAvatar, uploadImagens } from "../../multerConfig";

const router = Router();

//Rotas de pets protegidas
router.get("/mypets", authMiddleware, PetController.findPetsUserId);
router.post("/pet", authMiddleware, PetController.createPet);
router.put("/pet/:id", authMiddleware, PetController.updatedPet);
router.delete("/pet/:id", authMiddleware, PetController.deletPet);
router.put(
  "/pets/avatar/:petId",
  authMiddleware,
  uploadAvatar.single("avatar"),
  PetController.updateAvatar
);
router.post(
  "/pets/imagens/:segment/:petId",
  authMiddleware,
  uploadImagens.single("imagens"),
  PetController.uploadImagens
);

//rotas de adm
router.get("/pets", admMiddleware, PetController.findPet);
router.get("/pet/:id", admMiddleware, PetController.findPetById);

export default router;
