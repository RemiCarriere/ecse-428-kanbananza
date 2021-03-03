import userService from "../services/user";
import UserDTO from "../DTO/user";
import BoardDTO from "../DTO/board";

const passport = require("passport");

const create = async (req, res, next) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    res.status(201).json(user.toDTO());
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
  return passport.authenticate(
    "local",
    { session: false },
    (passportUser, info) => {
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        res.status(201).json(user.toDTO());
      } else {
        res.status(401).json(info);
      }
    }
  )(req, res, next);
};

const checkToken = async (req, res, next) => {
  const {
    payload: { id },
  } = req;
  return userService.findUserById(id).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }
    return res.json(user.toDTO());
  });
};

const index = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.params.id);
    res.status(200).json(UserDTO.fromDocument(user));
  } catch (e) {
    next(e);
  }
};

const select = async (req, res, next) => {
  let users = [];
  try {
    users = await userService.findAllUsers();
  } catch (e) {
    next(e);
  }
  res.status(200).json(users.map((user) => UserDTO.fromDocument(user)));
};

const selectBoards = async (req, res, next) => {
  let boards = [];
  try {
    boards = await userService.findAllUserBoards(req.params.id);
  } catch (e) {
    next(e);
  }
  res.status(200).json(boards.map((board) => BoardDTO.fromDocument(board)));
};

export default {
  create,
  findByEmail,
  login,
  index,
  select,
  selectBoards,
  checkToken,
};
