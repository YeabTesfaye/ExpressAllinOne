import { Router } from "express";
// import '../strategies/local-strategy.mjs';
import passport from "../strategies/local-strategy.mjs";
import { getStatus, login } from "../controller/auth.mjs";
const router = Router();

router.post("", login);

router.get("/status",getStatus);

export default router;
