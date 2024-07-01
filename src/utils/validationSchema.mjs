export const createUserValidationSchema = {
  username: {
    isLength: {
      Options: {
        min: 5,
        max: 32,
      },
    },
    errorMessage:
      "username must be at least 5 characters with max of 32 characters",

    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
  displayName: {
    isLength: {
      Options: {
        min: 5,
        max: 32,
      },
    },
    errorMessage:
      "username must be at least 5 characters with max of 32 characters",

    notEmpty: {
      errorMessage: "display Name cannot be empty",
    },
    isString: {
      erorMessage: "username must be a string",
    },
  },
};
