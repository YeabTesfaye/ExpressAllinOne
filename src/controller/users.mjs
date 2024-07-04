import { validateUserQuery } from "../utils/validateQuery.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { validationResult } from "express-validator";
export const getUsers =
  (validateUserQuery,
  (req, res) => {
    const {
      query: { filter, value },
    } = req;
    let filteredUser = [];
    if (filter && value) {
      filteredUser = mockUsers.filter((user) => {
        if (user.hasOwnProperty(filter)) {
          return user[filter].toString().includes(value.toString());
        }
      });
      return res.send(filteredUser);
    }
    return res.send(mockUsers);
  });
// GET /api/users/:id
export const getUserById = (req, res) => {
  const { userIndex } = req;
  const user = mockUsers[userIndex];
  console.log("user", userIndex);
  res.status(200).json({ user });
};

// POST /api/users
export const createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { body } = req;
  const newUser = {
    id: mockUsers.length + 1,
    ...body,
  };
  mockUsers.push(newUser);
  res.status(201).json(newUser);
};

// PUT /api/users/:id
export const updateUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { body, userIndex } = req;
  mockUsers[userIndex] = { id: mockUsers[userIndex].id, ...body };
  res.status(200).json({ msg: "User updated successfully" });
};

// PATCH /api/users/:id
export const patchUser = (req, res) => {
  const { body, userIndex } = req;
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...body,
  };
  res.status(200).json({ msg: "User updated successfully" });
};

// DELETE /api/users/:id
export const deleteUser = (req, res) => {
  const { userIndex } = req;
  mockUsers.splice(userIndex, 1);
  res.sendStatus(204);
};
