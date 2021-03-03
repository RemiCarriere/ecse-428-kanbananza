import { Error } from "mongoose";
import HttpError from "../http_error";
import Board from "../models/board";
import Column from "../models/column";

const createColumn = async ({ name, boardId, order }) => {
  if (await Column.exists({ boardId, name })) {
    throw new HttpError({
      code: 400,
      message: `Column name already in use for board with id ${boardId}.`,
    });
  }
  try {
    return await Column.create({ name, boardId, order });
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
const findAllColumns = async () => {
  return Column.find().exec();
};

const findColumnById = async (id) => {
  if (!(await Column.exists({ _id: id }))) {
    throw new HttpError({
      code: 404,
      message: `COlumn with id ${id} does not exist.`,
    });
  }
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
