import { Error } from "mongoose";
import HttpError from "../http_error";
import User from "../models/user";
import ValidationError from "../validation_error";
import Board from "../models/board";

const createUser = async ({ email, password, firstName, lastName }) => {
  if (await User.exists({ email })) {
    throw new HttpError({
      code: 400,
      message: "Uniqueness violation.",
      errors: [
        new ValidationError({
          path: "email",
          reason: "email is already in use.",
          data: email,
        }),
      ],
    });
  }

  try {
    const user = await User.create({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    user.setPassword(password);
    user.save();
    console.log(user);
    return user;
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      throw HttpError.fromMongooseValidationError(e);
    } else {
      throw e;
    }
  }
};
const findUserByEmail = async ({ email }) => {
  if (!(await User.exists({ email }))) {
    throw new HttpError({
      code: 404,
      message: `User with email '${email}' does not exist.`,
    });
  }
  try {
    return await User.findOne({ email }).exec();
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      throw HttpError.fromMongooseValidationError(e);
    } else {
      throw e;
    }
  }
};

const findUserById = async (id) => {
  if (!(await User.exists({ _id: id }))) {
    throw new HttpError({
      code: 404,
      message: `User with id ${id} does not exist.`,
    });
  }
  return User.findOne({ _id: id }).exec();
};

const findAllUsers = async () => {
  return User.find().exec();
};

const findAllUserBoards = async (id) => {
  return Board.find({ owner: id }).exec();
};

export default {
  createUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
  findAllUserBoards,
};
