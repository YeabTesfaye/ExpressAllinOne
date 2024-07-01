import { mockUsers } from "./constants.mjs";
export const validateUserId = (req, res, next) => {
    const { id } = req.params;
  
    const parsedId = parseInt(id);
  
    if (isNaN(parsedId)) {
      return res.status(400).send({ msg: "Bad request Invalid Id" });
    }
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  
    if (findUserIndex === -1) {
      return res.sendStatus(404);
    }
    req.userIndex = findUserIndex;
    next();
  };