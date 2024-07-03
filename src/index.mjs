import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "@#$@$@#Hello@#@$#@$",
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

export default app;
