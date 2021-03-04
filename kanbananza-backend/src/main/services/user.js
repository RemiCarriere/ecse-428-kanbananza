import User from "../models/user";
import ValidationError from "../validation_error";
import Board from "../models/board";

const createUser = async ({ email, password, firstName, lastName }) => {
  if (await User.exists({ email })) {
    throw new ValidationError({
      path: "email",
      reason: "email already in use",
      data: email,
    });
  }

  const user = await User.create({
    email,
    password,
    first_name: firstName,
    last_name: lastName,
  });

  user.setPassword(password);
  user.save();

  return user;
};
const findUserByEmail = async ({ email }) => {
  return User.findOne({ email }).exec();
};

const findUserById = async (id) => {
  return User.findOne({ _id: id }).exec();
};

const findAllUsers = async () => {
  return User.find().exec();
};

const findAllUserBoards = async (id) => {
  return Board.find({ ownerId: id }).exec();
};

const findUserBoardsByName = async (id, name) => {
  return Board.find({ ownerId: id, name }).exec();
};

export default {
  createUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
  findAllUserBoards,
  findUserBoardsByName,
};
