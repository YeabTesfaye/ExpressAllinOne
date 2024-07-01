import express from "express";
import routers from './routes/index.mjs';
import userRouter from "./routes/users.mjs";
import productRouter from './routes/products.mjs';
const app = express();
app.use(express.json());
app.use(routers);


export default app;
