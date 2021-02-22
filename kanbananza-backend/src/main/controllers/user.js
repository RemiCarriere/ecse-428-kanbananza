import userService from "../services/user";
import UserDTO from "../DTO/user";
import BoardDTO from "../DTO/board";
import Users from "../models/user";
const passport = require("passport");

const create = async (req, res, next) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    res.status(201).json({ user: user.toAuthJSON() });
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
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.status(201).json({ user: user.toAuthJSON() });
      }

      return res.status(400).json();
    }
  )(req, res, next);
};

const checkToken = async (req, res, next) => {
  const {
    payload: { id },
  } = req;
  return Users.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
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
