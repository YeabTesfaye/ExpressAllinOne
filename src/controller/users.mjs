import { validationResult } from "express-validator";
import User from "../mongoose/user.mjs";
import mongoose from "mongoose";
// GET /api/users
export const getUsers = async (req, res) => {
  const {
    query: { filter, value },
  } = req;

  try {
    let users;

    // If filter and value are provided, filter users based on the criteria
    if (filter && value) {
      const query = { [filter]: new RegExp(value, "i") }; // Case-insensitive search
      users = await User.find(query).select("-password"); // Exclude the password field
    } else {
      // If no filter is provided, fetch all users
      users = await User.find().select("-password"); // Exclude the password field
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
// GET /api/users/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  // Check if ID is missing or invalid
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// POST /api/users
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { body } = req;
  try {
    const newUser = new User({
      username: body.username,
      displayName: body.displayName,
      password: body.password,
    });
    await newUser.save();
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      displayName: newUser.displayName,
    };
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { body } = req;
  // Check if ID is missing or invalid
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    }).select("-password"); // Exclude the password field

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};
// PATCH /api/users/:id
export const patchUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // Check if ID is missing or invalid
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).select("-password"); // Exclude the password field

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};
