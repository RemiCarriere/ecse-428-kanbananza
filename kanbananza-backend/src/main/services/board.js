import Board from "../models/board";
import User from "../models/user";
import Column from "../models/column";
import ValidationError from "../validation_error";
import { isValidMongooseObjectId } from "../utils/validators";

const createBoard = async ({ name, ownerId }) => {
  if (!isValidMongooseObjectId(ownerId)) {
    throw new ValidationError({
      path: "ownerId",
      reason: "owner ID is invalid",
      data: ownerId,
    });
  }

  if (!(await User.exists({ _id: ownerId }))) {
    throw new ValidationError({
      path: "ownerId",
      reason: "owner does not exist",
      data: ownerId,
    });
  }

  if (await Board.exists({ ownerId, name })) {
    throw new ValidationError({
      path: "name",
      reason: "board name already in use for owner",
      data: name,
    });
  }

  return Board.create({ name, ownerId });
};

const findBoardById = async (id) => {
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
