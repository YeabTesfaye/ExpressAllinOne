import passport from "../strategies/local-strategy.mjs";

// POST /api/auth/login
export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Authentication error" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

// GET /api/auth/status
export const getStatus = (req, res) => {
  return req.user ? res.status(200).json(req.user) : res.sendStatus(401);
};
