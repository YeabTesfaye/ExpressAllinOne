import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT | 8080;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/ExpressAllinone")
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after a successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "@#$@$@#Hello@#@$r#@$",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routers);

// app.listen(PORT, () => {
//   console.log(`The app is running at port ${PORT}`);
// });

export default app;
