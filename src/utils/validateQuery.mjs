import { query, validationResult } from "express-validator";
export const validateUserQuery = [
    query("filter")
      .optional()
      .isIn(["id", "username", "displayName"])
      .withMessage("Filter must be one of id, username, or displayName")
      .isString()
      .trim()
      .escape(),
    query("value").optional().isString().trim().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];