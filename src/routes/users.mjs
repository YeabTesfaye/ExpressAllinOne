import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "../utils/validationSchema.mjs";
import {
  createUser,
  getUserById,
  getUsers,
  patchUser,
  updateUser,
} from "../controller/users.mjs";

const router = Router();
router.get("", getUsers);

router.get("/:id", getUserById);

router.post("", checkSchema(createUserValidationSchema), createUser);

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  updateUser
);
router.patch(
  "/:id",
  checkSchema(updateUserValidationSchema),
  patchUser
);

export default router;
