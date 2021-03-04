import HttpError from "../http_error";
import cardService from "../services/card";

const create = async (req, res, next) => {
  try {
    const card = await cardService.createCard({
      name: req.body.name,
      columnId: req.body.columnId,
      order: req.body.order,
    });
    res.status(201).json(CardDTO.fromDocument(card)); // convert to dto
  } catch (e) {
    next(e); // handle downstream
  }
};

const select = async (req, res, next) => {
  let cards = [];
  try {
    cards = await cardService.findAllCards();
  } catch (e) {
    next(e);
  }
  res.status(200).json(cards.map((card) => CardDTO.fromDocument(card)));
};

const index = async (req, res, next) => {
  try {
    const card = await cardService.findCardById(req.params.id);
    res.status(200).json(CardDTO.fromDocument(card));
  } catch (e) {
    next(e);
  }
};

export default { create, select, index };
