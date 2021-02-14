import HttpError from "../http_error";
import Board from "../models/board";
import User from "../models/user";

const createBoard = async ({ label, ownerId }) => {
  if (!(await User.exists({ _id: ownerId }))) {
    throw new HttpError({
      code: 400,
      message: `User with id ${ownerId} does not exist.`,
    });
  }

  Board.create({ label, owner: ownerId }, (err, board) => {
    if (err) throw err;
    return board;
  });
};

export default { createBoard };
