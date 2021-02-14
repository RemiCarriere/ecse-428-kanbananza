import Board from "../models/board";
import User from "../models/user";

const createBoard = async ({ label, ownerId }) => {
  User.exists({ _id: ownerId }, (err, user) => {
    if (err) throw new Error(`User with id '${ownerId}' does not exist.`);

    Board.create({ label, owner: ownerId }, (err, board) => {
      if (err) throw err;
      return board;
    });
  });
};

export default { createBoard };
