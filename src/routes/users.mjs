import { Router } from "express";
import { validateUserQuery } from "../utils/validateQuery.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { validateUserId } from "../utils/middlewares.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "../utils/validationSchema.mjs";

const router = Router();
router.get("", validateUserQuery, (req, res) => {
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

router.get("/:id", validateUserId, (req, res) => {
  const { userIndex } = req;
  const user = mockUsers[userIndex];
  if (user) return res.status(200).send({ user });
});

router.post("", checkSchema(createUserValidationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
  mockUsers.push(newUser);
  res.status(201).send(newUser);
});

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  validateUserId,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = matchedData(req);
    const { userIndex } = req;
    mockUsers[userIndex] = { id: mockUsers[userIndex].id, ...data };
    res.status(201).send({ msg: "User is updated Sucessfully" });
  }
);
router.patch(
  "/:id",
  checkSchema(updateUserValidationSchema),
  validateUserId,
  (req, res) => {
    const { body, userIndex } = req;

    mockUsers[userIndex] = {
      ...mockUsers[userIndex].idf,
      ...body,
      id: mockUsers[userIndex].id,
    };
    res.status(201).send({ msg: "User is updated Sucessfully" });
  }
);

router.delete("/api/users/:id", (req, res) => {
  const { userIndex } = req;

  mockUsers.splice(userIndex, 1);
  return res.sendStatus(204);
});
export default router;
