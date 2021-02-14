import userService from "../services/user";
import UserDTO from "../DTO/user";
import auth from "../auth";

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

const findByEmail = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail({
      email: req.body.email,
    });
    res.status(200).json(UserDTO.fromDocument(user));
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail({
      email: req.auth.user,
    });
    auth.authorizer(req, user);
    res.status(200).json(UserDTO.fromDocument(user));
  } catch (e) {
    next(e);
  }
};

export default { create, findByEmail, login };
