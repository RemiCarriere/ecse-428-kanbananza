import userService from "../services/user";
import UserDTO from "../DTO/user";
import auth from "../auth";
import BoardDTO from "../DTO/board";

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

export default { create, findByEmail, login, index, select, selectBoards };
