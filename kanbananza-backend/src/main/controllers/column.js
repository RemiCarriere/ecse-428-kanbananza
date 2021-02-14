import ColumnDTO from "../DTO/column";
import HttpError from "../http_error";
import columnService from "../services/column";

const create = async (req, res, next) => {
  try {
    const column = await columnService.createColumn({
      label: req.body.label,
      boardId: req.body.boardId,
    });
    res.status(201).json(ColumnDTO.fromDocument(column)); // convert to dto
  } catch (e) {
    next(e); // handle downstream
  }
};

export default { create };
