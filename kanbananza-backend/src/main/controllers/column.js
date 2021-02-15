import ColumnDTO from "../DTO/column";
import HttpError from "../http_error";
import columnService from "../services/column";

const create = async (req, res, next) => {
  try {
    const column = await columnService.createColumn({
      label: req.body.label,
      boardId: req.body.boardId,
      order: req.body.order,
    });
    res.status(201).json(ColumnDTO.fromDocument(column)); // convert to dto
  } catch (e) {
    next(e); // handle downstream
  }
};

const select = async (req, res, next) => {
  let columns = [];
  try {
    columns = await columnService.findAllColumns();
  } catch (e) {
    next(e);
  }
  res.status(200).json(columns.map((column) => ColumnDTO.fromDocument(column)));
};

const index = async (req, res, next) => {
  try {
    const column = await columnService.findColumnById(req.params.id);
    res.status(200).json(ColumnDTO.fromDocument(column));
  } catch (e) {
    next(e);
  }
};

export default { create, select, index };
