import HttpError from "../http_error";
import columnService from "../services/column";

const create = async (req, res, next) => {
  try {
    const column = await columnService.createcolumn({
      label: req.body.label,
      boardId: req.body.boardId,
    });
    console.log(column);
    res.status(201).json(column); // convert to dto
  } catch (e) {
    throw new HttpError({ code: 400, message: e.message });
  }
};

export default { create };
