import { Router } from "express";
import { validateUserQuery } from "../utils/validateQuery.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { validateUserId } from "../utils/middlewares.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "../utils/validationSchema.mjs";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  patchUser,
  updateUser,
} from "../controller/users.mjs";

const router = Router();
router.get("", getUsers);

router.get("/:id", validateUserId, getUserById);

router.post("", checkSchema(createUserValidationSchema), createUser);

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  validateUserId,
  updateUser
);
router.patch(
  "/:id",
  checkSchema(updateUserValidationSchema),
  validateUserId,
  patchUser
);

router.delete("/:id", deleteUser);
export default router;
