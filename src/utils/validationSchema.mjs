import Joi from "joi";
export const createUserValidationSchema = {
  username: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Username can't be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    trim: true,
    escape: true,
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Username must be between 5 to 32 characters",
    },
  },
  displayName: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Display Name can't be empty",
    },
    isString: {
      errorMessage: "Display Name must be a string",
    },
    trim: true,
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Display Name must be between 5 to 32 characters",
    },
  },
};

export const updateUserValidationSchema = {
  username: {
    in: ["body"],
    optional: true, // Make the field optional for PATCH requests
    isString: {
      errorMessage: "Username must be a string",
    },
    trim: true,
    escape: true,
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Username must be between 5 to 32 characters",
    },
  },
  displayName: {
    in: ["body"],
    optional: true, // Make the field optional for PATCH requests
    isString: {
      errorMessage: "Display Name must be a string",
    },
    trim: true,
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Display Name must be between 5 to 32 characters",
    },
  },
};

export const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  displayName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});
