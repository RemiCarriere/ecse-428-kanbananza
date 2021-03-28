import columnService from "../services/column";
import ValidationError from "../validation_error";
import HttpError from "../http_error";

const create = async (req, res, next) => {
  try {
    const column = await columnService.createColumn({
      name: req.body.name,
      boardId: req.body.boardId,
      order: req.body.order,
    });

    return res.status(201).json(column.toDTO()); // convert to dto
  } catch (e) {
    if (e instanceof ValidationError) {
      return next(
        new HttpError({
          code: 400,
          message: "Invalid card information.",
          errors: [e],
        })
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

  return res.status(200).json(columns.map((column) => column.toDTO()));
};

const selectCards = async (req, res, next) => {
  let cards = [];
  try {
    if (req.query.name !== undefined) {
      cards = await columnService.findColumnCardsByName(
        req.params.id,
        req.query.name
      );
    } else {
      cards = await columnService.findAllColumnCards(req.params.id);
      await cards.sort((a, b) => (a.order > b.order ? 1 : -1));
    }
  } catch (e) {
    next(e);
  }

  return res.status(200).json(cards.map((card) => card.toDTO()));
};

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

    // prettier-ignore
    const updatedInfo = { // see https://www.kevinpeters.net/adding-object-properties-conditionally-with-es-6
      ...(req.body.name !== undefined && {name: req.body.name}),
      ...(req.body.boardId !== undefined && {boardId: req.body.boardId}),
      ...(req.body.order !== undefined && {order: req.body.order})
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

const remove = async (req, res, next) => {
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

    await columnService.deleteColumnById(req.params.id);

    return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};

export default { create, index, select, selectCards, update, remove };
