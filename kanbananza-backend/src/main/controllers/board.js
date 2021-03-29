import mongoose from "mongoose";
import boardService from "../services/board";
import ValidationError from "../validation_error";
import HttpError from "../http_error";

const create = async (req, res, next) => {
  try {
    const board = await boardService.createBoard({
      name: req.body.name,
      ownerId: req.body.ownerId,
    });

    return res.status(201).json(board.toDTO());
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(
        HttpError.fromMongooseValidationError(e, "Invalid board information.")
      );
    }

    if (e instanceof ValidationError) {
      return next(
        new HttpError({
          code: 400,
          message: "Invalid board information.",
          errors: [e],
        })
      );
    }

    return next(e);
  }
};

const index = async (req, res, next) => {
  try {
    const board = await boardService.findBoardById(req.params.id);

    if (board === null) {
      return next(
        new HttpError({
          code: 404,
          message: `Board with id ${req.params.id} does not exist.`,
        })
      );
    }

    return res.status(200).json(board.toDTO());
  } catch (e) {
    return next(e);
  }
};

const select = async (req, res, next) => {
  let boards = [];
  try {
    if (req.query.name !== undefined) {
      boards = await boardService.findBoardsByName(req.query.name);
    } else {
      boards = await boardService.findAllBoards();
    }
  } catch (e) {
    return next(e);
  }
  return res.status(200).json(boards.map((board) => board.toDTO()));
};

const selectColumns = async (req, res, next) => {
  let columns = [];
  try {
    if (req.query.name !== undefined) {
      columns = await boardService.findBoardColumnsByName(
        req.params.id,
        req.query.name
      );
    } else {
      columns = await boardService.findAllBoardColumns(req.params.id);
    }
  } catch (e) {
    return next(e);
  }
  return res.status(200).json(columns.map((column) => column.toDTO()));
};

const update = async (req, res, next) => {
  try {
    let board;

    board = await boardService.findBoardById(req.params.id);

    if (board === null) {
      return next(
        new HttpError({
          code: 404,
          message: `Board with id ${req.params.id} does not exist.`,
        })
      );
    }

    // prettier-ignore
    const updatedInfo = { // see https://www.kevinpeters.net/adding-object-properties-conditionally-with-es-6
      ...(req.body.name !== undefined && {name: req.body.name}),
      ...(req.body.ownerId !== undefined && {columnId: req.body.ownerId}),
    };

    board = await boardService.updateBoardById(req.params.id, updatedInfo);

    return res.status(200).json(board.toDTO());
  } catch (e) {
    if (e instanceof ValidationError) {
      return next(
        new HttpError({
          code: 400,
          message: "Invalid board information.",
          errors: [e],
        })
      );
    }

    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await boardService.deleteBoardById(req.params.id);
  } catch (e) {
    return next(e);
  }
  return res.sendStatus(204);
};

export default { create, select, index, selectColumns, update, remove };
