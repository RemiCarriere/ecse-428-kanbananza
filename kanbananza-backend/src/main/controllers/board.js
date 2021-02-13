import HttpError from "../http_error";
import boardService from "../services/board";

const create = async (req, res) => {
  try {
    const board = await boardService.createboard({
      label: req.body.label,
      user: req.body.board,
    });
    console.log(board);
    res.status(201).json(board); // convert to dto
  } catch (e) {
    throw new HttpError({ code: 400, message: e.message });
  }
};

export default { create };
