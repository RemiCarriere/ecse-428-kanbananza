import { Error } from "mongoose";
import HttpError from "../http_error";
import Board from "../models/board";
import User from "../models/user";
import Coumn from "../models/column";

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
      next(
        new HttpError({
          code: 400,
          message: "Invalid field(s)",
          body: Object.values(e.errors).map((error) => error.message),
        })
      );
    } else {
      next(e);
    }
  }
};

const findBoardById = async (id) => {
  try {
    return await Board.findOne({ _id: id }).exec();
  } catch (e) {
    next(e);
  }
};

const findAllBoards = async () => {
  try {
    return await Board.find().exec();
  } catch (e) {
    next(e);
  }
};

const findBoardsByName = async (name) => {
  try {
    return await Board.find({ name }).exec();
  } catch (e) {
    next(e);
  }
};

const findAllBoardColumns = async (id) => {
  try {
    return await Column.find({ boardId: id }).exec();
  } catch (e) {
    next(e);
  }
};

const findAllBoardColumnsByName = async (id, name) => {
  try {
    return await Column.find({ boardId: id, name }).exec();
  } catch (e) {
    next(e);
  }
};

export default {
  createBoard,
  findAllBoards,
  findBoardsByName,
  findAllBoardColumns,
  findAllBoardColumnsByName,
};
