import Column from "../models/column";
import ValidationError from "../validation_error";

const createColumn = async ({ name, boardId, order }) => {
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
  return Column.findOne({ _id: id }).exec();
};

const findColumnsByName = async (name) => {
  return Column.find({ name }).exec();
};

export default {
  createColumn,
  findColumnById,
  findAllColumns,
  findColumnsByName,
};
