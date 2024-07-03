import { Router } from "express";
// import '../strategies/local-strategy.mjs';
import passport from "../strategies/local-strategy.mjs";
const router = Router();

router.post("", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

router.get("/status", (req, res) => {
  return req?.user ? res.status(200).send(req.user) : res.sendStatus(401);
});

export default router;
