import { Router } from "express";
import { login, signup, deleteUser } from "../controller/auth.mjs";
const router = Router();

router.post("/login", login);
router.post("/signup", signup);

router.delete("/:id", deleteUser);

export default router;
