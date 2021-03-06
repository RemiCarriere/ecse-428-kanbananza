import Column from "../models/column";
import Card from "../models/card";
import ValidationError from "../validation_error";
import { isValidMongooseObjectId } from "../utils/validators";

const createColumn = async ({ name, boardId, order }) => {
  if (!isValidMongooseObjectId(boardId)) {
    throw new ValidationError({
      path: "boardId",
      reason: "board ID is invalid",
      data: boardId,
    });
  }

  if (await Column.exists({ boardId, name })) {
    throw new ValidationError({
      path: "name",
      reason: "column name already in use for board",
      data: name,
    });
  }

  return Column.create({ name, boardId, order });
};
const findAllColumns = async () => {
  return Column.find().exec();
};

const findColumnById = async (id) => {
  return Column.findById(id).exec();
};

const findColumnsByName = async (name) => {
  return Column.find({ name }).exec();
};

const updateColumnById = async (id, updatedInfo) => {
  if (
    updatedInfo.boardId !== undefined &&
    !isValidMongooseObjectId(updatedInfo.boardId)
  ) {
    throw new ValidationError({
      path: "boardId",
      reason: "board ID is invalid",
      data: updatedInfo.boardId,
    });
  }

  return Column.findByIdAndUpdate(id, updatedInfo, { new: true }); // see https://masteringjs.io/tutorials/mongoose/findoneandupdate
};

const deleteColumnById = async (id) => {
  await Card.deleteMany({columnId: id}); // cascade
  return Column.findByIdAndDelete(id);
};

export default {
  createColumn,
  findColumnById,
  findAllColumns,
  findColumnsByName,
  updateColumnById,
  deleteColumnById
};
