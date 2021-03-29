import Board from "../models/board";
import User from "../models/user";
import Column from "../models/column";
import ValidationError from "../validation_error";
import { isValidMongooseObjectId } from "../utils/validators";
import columnService from "./column";

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

const findAllBoards = async () => {
  return Board.find().exec();
};

const findBoardById = async (id) => {
  return Board.findById(id).exec();
};

const findBoardsByName = async (name) => {
  return Board.find({ name }).exec();
};

const findAllBoardColumns = async (id) => {
  return Column.find({ boardId: id }).exec();
};

const findBoardColumnsByName = async (id, name) => {
  return Column.find({ boardId: id, name }).exec();
};

const updateBoardById = async (id, updatedInfo) => {
  if (
    updatedInfo.ownerId !== undefined &&
    !isValidMongooseObjectId(updatedInfo.columnId)
  ) {
    throw new ValidationError({
      path: "ownerId",
      reason: "owner ID is invalid",
      data: updatedInfo.ownerId,
    });
  }

  return Board.findByIdAndUpdate(id, updatedInfo, { new: true }).exec(); // see https://masteringjs.io/tutorials/mongoose/findoneandupdate
};

const deleteBoardById = async (id) => {
  (await Column.find({ boardId: id }).exec()).forEach((column) => {
    columnService.deleteColumnById(column._id).exec();
  }); // cascade
  return Board.findByIdAndDelete(id).exec();
};

export default {
  createBoard,
  findAllBoards,
  findBoardById,
  findBoardsByName,
  findAllBoardColumns,
  findBoardColumnsByName,
  updateBoardById,
  deleteBoardById,
};
