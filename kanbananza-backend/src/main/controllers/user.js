import HttpError from "../http_error";
import userService from "../services/user";
import UserDTO from "../DTO/user_DTO";

const create = async (req, res, next) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    res.status(201).json(UserDTO.fromDocument(user));
  } catch (e) {
    next(e);
  }
};

export default { create };
