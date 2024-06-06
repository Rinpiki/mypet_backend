import { Router } from "express";
import Usercontroller from "../controllers/Usercontroller";

const router = Router();

router.get("/users", Usercontroller.findUser);
router.post("/user", Usercontroller.createUser);

export default router;
