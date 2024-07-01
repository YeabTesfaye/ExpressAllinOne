import { Router } from "express";
import { mockProducts } from "../utils/constants.mjs";
const router = Router();

router.get("/api/products", (req, res) => {
  res.status(200).send(mockProducts);
});

export default router;
