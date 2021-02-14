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
      message: `Board has already ao column with label ${newlabel}.`,
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

export default { createColumn };
