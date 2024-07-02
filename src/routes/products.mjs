import { Router } from "express";
import { mockProducts } from "../utils/constants.mjs";
const router = Router();

router.get("", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  res.status(200).send(mockProducts);
});

export default router;
