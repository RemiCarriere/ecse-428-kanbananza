import userService from "../services/user";

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
    return next(e);
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
    const user = await userService.findUserById(req.params.id); // TODO, make the is null? throw 404 http error happen here rather than at service level, service is okay with giving empty result, this  error is front facing and should be generated at controller level (for all such services)
    res.status(200).json(user.toDTO());
  } catch (e) {
    return next(e);
  }
};

const indexOnEmail = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail({
      email: req.body.email,
    });
    res.status(200).json(user.toDTO());
  } catch (e) {
    return next(e);
  }
};

const select = async (req, res, next) => {
  let users = [];
  try {
    users = await userService.findAllUsers();
  } catch (e) {
    return next(e);
  }
  res.status(200).json(users.map((user) => user.toDTO()));
};

const selectBoards = async (req, res, next) => {
  let boards = [];
  try {
    if (req.query.name !== undefined) {
      boards = userService.findUserBoardsByName(req.params.id, req.query.name);
    } else {
      boards = await userService.findAllUserBoards(req.params.id);
    }
  } catch (e) {
    return next(e);
  }
  res.status(200).json(boards.map((board) => board.toDTO()));
};

export default {
  create,
  login,
  index,
  indexOnEmail,
  select,
  selectBoards,
  checkToken,
};
