import { Error } from "mongoose";
import HttpError from "../http_error";
import Board from "../models/board";
import User from "../models/user";

const createBoard = async ({ name, ownerId }) => {
  if (!(await User.exists({ _id: ownerId }))) {
    throw new HttpError({
      code: 400,
      message: `User with id ${ownerId} does not exist.`,
    });
  }

  try {
    return await Board.create({ name, owner: ownerId });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      throw new HttpError({
        code: 400,
        message: "Invalid field(s)",
        body: Object.values(e.errors).map((error) => error.message),
      });
    } else {
      throw e;
    }
  }
};

export default { createBoard };
