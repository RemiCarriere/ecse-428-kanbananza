import mongoose from "mongoose";
import HttpError from "../http_error";
import cardService from "../services/card";
import ValidationError from "../validation_error";

const create = async (req, res, next) => {
  try {
    const card = await cardService.createCard({
      name: req.body.name,
      columnId: req.body.columnId,
      order: req.body.order,
    });
    res.status(201).json(card.toDTO()); // convert to dto
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
  } catch (e) {
    return next(e);
  }
  res.status(200).json(cards.map((card) => card.toDTO()));
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

    res.status(200).json(card.toDTO());
  } catch (e) {
    return next(e);
  }
};

export default { create, select, index };