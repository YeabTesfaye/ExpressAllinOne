import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";
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
  return res.send("hello");
});

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const user = mockUsers.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return res.status(401).send({ msg: "Bad Credentials" });
  }

  req.session.user = user;

  return res.status(200).send(user);
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Auth failed" });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  res.status(200).send(item);
});
app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.status(200).send(req.session.cart ?? []);
});
export default app;
