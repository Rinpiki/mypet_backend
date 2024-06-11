import { Router } from "express";
import Usercontroller from "../controllers/Usercontroller";

const router = Router();

router.get("/users", Usercontroller.findUser);
router.post("/user", Usercontroller.createUser);
router.put("/user/:id", Usercontroller.editUser);
router.delete("/user/:id", Usercontroller.deletuser);

export default router;
