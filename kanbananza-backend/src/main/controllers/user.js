import mongoose from "mongoose";
import passport from "passport";
import userService from "../services/user";
import HttpError from "../http_error";
import ValidationError from "../validation_error";

const create = async (req, res, next) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });

    return res.status(201).json(user.toDTO());
  } catch (e) {
    if (e instanceof ValidationError) {
      return next(
        new HttpError({
          code: 400,
          message: "Invalid user information.",
          errors: [e],
        })
      );
    }
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
        return res.status(201).json(user.toDTO());
      }
      return res.status(401).json(info);
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

    if (user === null) {
      return next(
        new HttpError({
          code: 404,
          message: `User with id '${req.params.id}' does not exist.`,
        })
      );
    }

    return res.status(200).json(user.toDTO());
  } catch (e) {
    return next(e);
  }
};

const indexOnEmail = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail({
      email: req.params.email,
    });

    if (user === null) {
      return next(
        new HttpError({
          code: 404,
          message: `User with email '${req.params.email}' does not exist.`,
        })
      );
    }

    return res.status(200).json(user.toDTO());
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(HttpError.fromMongooseValidationError(e));
    }

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

  return res.status(200).json(users.map((user) => user.toDTO()));
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
  return res.status(200).json(boards.map((board) => board.toDTO()));
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
