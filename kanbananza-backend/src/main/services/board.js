import HttpError from "../http_error";
import Board from "../models/board";
import User from "../models/user";

const createBoard = ({ label, ownerId }) => {
  User.exists({ _id: ownerId }, (err, existence) => {
    if (err) throw e;

    if (!existence) {
      throw new HttpError({
        code: 400,
        message: `User with id ${ownerId} does not exist.`,
      });
    }

    Board.create({ label, owner: ownerId }, (err, board) => {
      if (err) throw err;
      return board;
    });
  });
};

export default { createBoard };
