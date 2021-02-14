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
    console.log(board);
    res.status(201).json(BoardDTO.fromDocument(board));
  } catch (e) {
    next(e);
  }
};

const select = async (req, res, next) => {
  let boards = [];
  try {
    if (Object.keys(req.query).length === 0) {
      // no query params
      boards = await boardService.findAllBoards();
    } else {
      if (req.params.name) {
        boards = await boardService.findBoardsByName(req.params.name);
      }
    }
  } catch (e) {
    next(e);
  }
  res.status(200).json(boards.map((board) => BoardDTO.fromDocument(board)));
};

const index = async (req, res, next) => {
  try {
    const board = await boardService.findBoardById(req.params.id);
    res.status(200).json(BoardDTO.fromDocument(board));
  } catch (e) {
    next(e);
  }
};

const selectColumns = (req, res, next)  => {
  let columns = [];
  try {
    if (Object.keys(req.query).length === 0) {
      // no query params
      columns = await boardService.findAllBoardColumns(req.params.id);
    } else {
      if (req.params.name) {
        boards = await boardService.findBoardColumnsByName(req.params.id, req.params.name);
      }
    }
  } catch (e) {
    next(e);
  }
  res.status(200).json(columns.map((column) => ColumnDTO.fromDocument(column)));
}
export default { create, select, index, selectColumns };
