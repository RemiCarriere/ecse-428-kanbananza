import mongoose from "mongoose";
import columnService from "../services/column";
import HttpError from "../http_error";
import ValidationError from "../validation_error";

const create = async (req, res, next) => {
  try {
    const column = await columnService.createColumn({
      name: req.body.name,
      boardId: req.body.boardId,
      order: req.body.order,
    });

    res.status(201).json(column.toDTO()); // convert to dto
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(
        HttpError.fromMongooseValidationError(e, "Invalid column information.")
      );
    }

    return next(e);
  }
};

const select = async (req, res, next) => {
  let columns = [];
  try {
    if (req.query.name !== undefined) {
      columns = await columnService.findColumnsByName(req.query.name);
    } else {
      columns = await columnService.findAllColumns();
    }
  } catch (e) {
    return next(e);
  }
  res.status(200).json(columns.map((column) => column.toDTO()));
};

// const selectCards = async (req, res, next) => {
//   let cards = [];
//   try {
//     if (req.query.name !== undefined) {
//       cards = await cardService.findColumnCardsByName(
//         req.params.id,
//         req.query.name
//       );
//     } else {
//       cards = await cardService.findAllColumnCards(req.params.id);
//     }
//   } catch (e) {
//     next(e);
//   }
//   res.status(200).json(cards.map((card) => card.toDTO()));
// };

const index = async (req, res, next) => {
  try {
    const column = await columnService.findColumnById(req.params.id);

    if (column === null) {
      return next(
        new HttpError({
          code: 404,
          message: `Column with id ${req.params.id} does not exist.`,
        })
      );
    }

    return res.status(200).json(column.toDTO());
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    let column;

    column = await columnService.findColumnById(req.params.id);

    if (column === null) {
      return next(
        new HttpError({
          code: 404,
          message: `Column with id ${req.params.id} does not exist.`,
        })
      );
    }

    const updatedInfo = {
      name: req.body.name !== undefined ? req.body.name : column.name,
      boardId:
        req.body.boardId !== undefined ? req.body.boardId : column.boardId,
      order: req.body.order !== undefined ? req.body.order : column.order,
    };

    column = await columnService.updateColumnById(req.params.id, updatedInfo);

    return res.status(200).json(column.toDTO());
  } catch (e) {
    if (e instanceof ValidationError) {
      return next(
        new HttpError({
          code: 400,
          message: "Invalid column information.",
          errors: [e],
        })
      );
    }

    return next(e);
  }
};

export default { create, index, select, update };
