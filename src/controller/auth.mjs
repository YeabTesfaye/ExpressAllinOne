import passport from "../strategies/local-strategy.mjs";
import User from "../mongoose/user.mjs";
import { signupSchema } from "../utils/validationSchema.mjs";
// POST /api/auth/login
export const login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Authentication error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Auth Failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};

// Post /api/auth/signup
export const signup = async (req, res) => {
  const { username, displayName, password } = req.body;
  const { error } = signupSchema.validate({ username, displayName, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      displayName,
      password,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// DELETE /api/auth/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
