import boardService from "../services/board";
import HttpError from "../http_error";
import BoardDTO from "../DTO/board";

const create = async (req, res, next) => {
  try {
    const board = await boardService.createBoard({
      name: req.body.name,
      ownerId: req.body.ownerId,
    });
    console.log(board);
    res.status(201).json(BoardDTO.fromDocument(board));
  } catch (e) {
    next(e);
  }
};

export default { create };
