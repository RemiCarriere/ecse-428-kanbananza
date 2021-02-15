import { Error } from "mongoose";
import HttpError from "../http_error";
import Board from "../models/board";
import Column from "../models/column";

const createColumn = async ({ newlabel, boardId }) => {
  if (!(await Board.exists({ _id: boardId }))) {
    throw new HttpError({
      code: 400,
      message: `Board with id ${boardId} does not exist.`,
    });
  }
  if (await Column.exists({ label: newlabel, boardId })) {
    throw new HttpError({
      code: 400,
      message: `Board has already a column with label ${newlabel}.`,
    });
  }
  try {
    const newCol = await Column.create({ newlabel, boardId });
    return newCol;
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
      message: `User with id ${id} does not exist.`,
    });
  }
  return Column.findOne({ _id: id }).exec();
};
export default { createColumn, findAllColumns, findColumnById };
