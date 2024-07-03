import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = mockUsers.find((user) => user.id === id);
    if (!user) throw new Error("User Not Found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const strategy = new LocalStrategy((username, password, done) => {
  try {
    const user = mockUsers.find((user) => user.username === username);

    if (!user) throw new Error("User not found");
    if (user.password !== password) throw new Error("Bad Credentials");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(strategy);

export default passport;
