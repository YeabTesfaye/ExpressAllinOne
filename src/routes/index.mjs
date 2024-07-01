import { Router } from "express";
import userRouter from './users.mjs';
import productRouter from './products.mjs';
const router = Router();

router.use("/api/users", userRouter);
router.use("/api/products", productRouter);

export default router;