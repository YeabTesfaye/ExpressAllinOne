import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
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
app.use(routers);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 1000 });
  return res.send("hello");
});
export default app;
