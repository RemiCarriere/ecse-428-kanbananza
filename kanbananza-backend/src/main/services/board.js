import HttpError from "../http_error";
import Board from "../models/board";
import User from "../models/user";
import { Error } from "mongoose";

const createBoard = async ({ label, ownerId }) => {
  if (!(await User.exists({ _id: ownerId }))) {
    throw new HttpError({
      code: 400,
      message: `User with id ${ownerId} does not exist.`,
    });
  }

  try {
    return await Board.create({ label, owner: ownerId });
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
