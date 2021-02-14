import boardService from "../services/board";
import HttpError from "../http_error";

const create = async (req, res, next) => {
  try {
    const board = await boardService.createboard({
      label: req.body.label,
      user: req.body.board,
    });
    console.log(board);
    res.status(201).json(board); // convert to dto
  } catch (e) {
    next(new HttpError({ code: 400, message: e.message }));
  }
};

export default { create };
