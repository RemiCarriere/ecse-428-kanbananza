import boardService from "../services/board";
import HttpError from "../http_error";
import BoardDTO from "../DTO/board";
import ColumnDTO from "../DTO/column";

const create = async (req, res, next) => {
  try {
    const board = await boardService.createBoard({
      name: req.body.name,
      ownerId: req.body.ownerId,
    });
    res.status(201).json(board.toDTO());
  } catch (e) {
    next(e);
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
    next(e);
  }
  res.status(200).json(boards.map((board) => board.toDTO()));
};

const index = async (req, res, next) => {
  try {
    const board = await boardService.findBoardById(req.params.id);
    res.status(200).json(board.toDTO());
  } catch (e) {
    next(e);
  }
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
    next(e);
  }
  res.status(200).json(columns.map((column) => column.toDTO()));
};

const remove = async (req, res, next) => {
  try {
    await boardService.deleteBoardById(req.params.id);
  } catch (e) {
    next(e);
  }
  res.status(204);
};

export default { create, select, index, selectColumns, remove };
