import HttpError from "../http_error";
import cardService from "../services/card";
import ValidationError from "../validation_error";

const create = async (req, res, next) => {
  try {
    const card = await cardService.createCard({
      name: req.body.name,
      columnId: req.body.columnId,
      order: req.body.order,
      description: req.body.description,
      priority: req.body.priority,
    });

    return res.status(201).json(card.toDTO()); // convert to dto
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
  let cards = [];
  try {
    if (req.query.name !== undefined) {
      cards = await cardService.findCardsByName(req.query.name);
    } else {
      cards = await cardService.findAllCards();
    }

    return res.status(200).json(cards.map((card) => card.toDTO()));
  } catch (e) {
    return next(e);
  }
};

const index = async (req, res, next) => {
  try {
    const card = await cardService.findCardById(req.params.id);

    if (card === null) {
      return next(
        new HttpError({
          code: 404,
          message: `Card with id ${req.params.id} does not exist.`,
        })
      );
    }

    return res.status(200).json(card.toDTO());
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    let card;

    card = await cardService.findCardById(req.params.id);

    if (card === null) {
      return next(
        new HttpError({
          code: 404,
          message: `Card with id ${req.params.id} does not exist.`,
        })
      );
    }

    // prettier-ignore
    const updatedInfo = { // see https://www.kevinpeters.net/adding-object-properties-conditionally-with-es-6
      ...(req.body.name !== undefined && {name: req.body.name}),
      ...(req.body.columnId !== undefined && {columnId: req.body.columnId}),
      ...(req.body.order !== undefined && {order: req.body.order}),
      ...(req.body.description !== undefined && {description: req.body.description}),
      ...(req.body.priority !== undefined && {priority: req.body.priority}),
    };

    card = await cardService.updateCardById(req.params.id, updatedInfo);

    return res.status(200).json(card.toDTO());
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

const remove = async (req, res, next) => {
  try {
    const card = await cardService.findCardById(req.params.id);

    if (card === null) {
      return next(
        new HttpError({
          code: 404,
          message: `Card with id ${req.params.id} does not exist.`,
        })
      );
    }

    await cardService.deleteCardById(req.params.id);

    return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};

export default { create, select, index, update, remove };
