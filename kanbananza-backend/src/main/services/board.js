import { Error } from "mongoose";
import HttpError from "../http_error";
import Board from "../models/board";
import User from "../models/user";
import Column from "../models/column";
import ValidationError from "../validation_error";

const createBoard = async ({ name, ownerId }) => {
  if (!(await User.exists({ _id: ownerId }))) {
    throw new HttpError({
      code: 400,
      message: `User with id ${ownerId} does not exist.`,
    });
  }

  if (await Board.exists({ ownerId, name })) {
    throw new HttpError({
      code: 400,
      message: `Board name already in use for user with id ${ownerId}.`,
    });
  }

  try {
    return Board.create({ name, ownerId });
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

const findBoardById = async (id) => {
  if (!(await Board.exists({ _id: id }))) {
    throw new HttpError({
      code: 404,
      message: `Board with id ${id} does not exist.`,
    });
  }
  return Board.findOne({ _id: id }).exec();
};

const findAllBoards = async () => {
  return Board.find().exec();
};

const findBoardsByName = async (name) => {
  return Board.find({ name }).exec();
};

const findAllBoardColumns = async (id) => {
  return Column.find({ boardId: id }).exec();
};

const findAllBoardColumnsByName = async (id, name) => {
  return Column.find({ boardId: id, name }).exec();
};

const deleteBoardById = async (id) => {
  return Board.deleteOne({ _id: id });
};

export default {
  createBoard,
  findAllBoards,
  findBoardById,
  findBoardsByName,
  findAllBoardColumns,
  findAllBoardColumnsByName,
  deleteBoardById,
};
