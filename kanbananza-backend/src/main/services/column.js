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

const findAllColumnCards = async (id) => {
  return Card.find({ columnId: id }).exec();
};

const findColumnCardsByName = async (id, name) => {
  return Card.find({ columnId: id, name }).exec();
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

  const newBoardId =
    updatedInfo.boardId !== undefined
      ? updatedInfo.boardId
      : (await findColumnById(id)).boardId;

  if (
    updatedInfo.name !== undefined &&
    (await Column.exists({
      boardId: newBoardId,
      name: updatedInfo.name,
    }))
  ) {
    throw new ValidationError({
      path: "name",
      reason: "column name already in use for board",
      data: updatedInfo.name,
    });
  }

  return Column.findByIdAndUpdate(id, updatedInfo, { new: true }).exec(); // see https://masteringjs.io/tutorials/mongoose/findoneandupdate
};

const findCurrentOrder = async (columnId, order) => {
  return Column.find({ columnId, order: { $gte: order } })
    .sort({ order: "asc" })
    .exec();
};

const deleteColumnById = async (id) => {
  const column = await findColumnById(id);

  const columns = await findCurrentOrder(column.columnId, column.order);

  let c;
  for (let i = 0; i < columns.length; i += 1){
    c = cards[i];

    c.order += c.order - 1;
    await c.save();
  }

  await Card.deleteMany({ columnId: id }).exec(); // cascade
  return Column.findByIdAndDelete(id).exec();
};

export default {
  createColumn,
  findAllColumns,
  findColumnById,
  findColumnsByName,
  findAllColumnCards,
  findColumnCardsByName,
  updateColumnById,
  deleteColumnById,
};
