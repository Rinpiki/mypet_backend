import { Router } from "express";
import PetController from "../controllers/PetController";
import { admMiddleware } from "../middlewares/admMidldleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploadAvatar, uploadImagens } from "../../multerConfig";
import { authUploadsMiddleware } from "../middlewares/authUploadsMiddleware";

const router = Router();

//Rotas de pets protegidas
router.get("/mypets", authMiddleware, PetController.findPetsUserId);
router.post("/pet", authMiddleware, PetController.createPet);
router.put("/pet/:id", authMiddleware, PetController.updatedPet);
router.delete("/pet/:id", authMiddleware, PetController.deletePet);
router.put(
  "/pets/avatar/:petId",
  authUploadsMiddleware,
  uploadAvatar.single("avatar"),
  PetController.updateAvatar
);
router.post(
  "/pets/imagens/:segment/:petId",
  authUploadsMiddleware,
  uploadImagens.single("imagens"),
  PetController.uploadImagens
);
router.get("/images", authMiddleware, PetController.deleteImages);

//rotas de adm
router.get("/pets", admMiddleware, PetController.findPet);
router.get("/pet/:id", admMiddleware, PetController.findPetById);
router.get("/pets/:userid", admMiddleware, PetController.findPetsUserId);

export default router;
