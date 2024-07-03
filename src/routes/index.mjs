import { Router } from "express";
import userRouter from './users.mjs';
import productRouter from './products.mjs';
import authRouter from './auth.mjs';
const router = Router();

router.use("/api/users", userRouter);
router.use("/api/products", productRouter);
router.use("/api/auth", authRouter);
export default router;