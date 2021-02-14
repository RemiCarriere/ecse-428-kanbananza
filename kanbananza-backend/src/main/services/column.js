import { Error } from "mongoose";
import HttpError from "../http_error";
import Board from "../models/board";
import Column from "../models/column";

const createColumn = async ({ newlabel, board }) => {
  if (!(await Board.exists({ _id: board }))) {
    throw new HttpError({
      code: 400,
      message: `Board with id ${board} does not exist.`,
    });
  }
  if (await Column.exists({ label: newlabel })) {
    throw new HttpError({
      code: 400,
      message: `Column with label ${newlabel} already exists.`,
    });
  }
  try {
    const newCol = await Column.insertOne({ newlabel, board });
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
