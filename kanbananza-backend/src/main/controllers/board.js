import boardService from "../services/board";
import HttpError from "../http_error";
import BoardDTO from "../DTO/board";

const create = async (req, res, next) => {
  try {
    const board = await boardService.createBoard({
      label: req.body.label,
      ownerId: req.body.ownerId,
    });
    console.log(board);
    res.status(201).json(BoardDTO.fromDocument(board));
  } catch (e) {
    if (e instanceof HttpError) {
      next(e);
    } else {
      next(new HttpError({ code: 400, message: e.message }));
    }
  }
};

export default { create };
