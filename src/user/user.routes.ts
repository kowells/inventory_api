import { Router } from "express";
import { registerUser, loginUser } from "../user/user.controller";
import { validateUserLogin, validateUserRegister } from "./user.validation";

const router = Router();

router.post("/register", validateUserRegister, registerUser);
router.post("/login", validateUserLogin, loginUser);

export default router;
