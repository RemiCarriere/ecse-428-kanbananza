import Card from "../models/card";
import ValidationError from "../validation_error";

const createCard = async ({ name, columnId, order }) => {
  const cardsOfColumn = await Card.find({ columnId });

  cardsOfColumn.forEach((card) => {
    if (card.order === order) {
      throw new ValidationError({
        path: "order",
        data: order,
        reason: "card order already in use for column",
      });
    }
  });

  return Card.create({ name, columnId, order });
};

const findAllCards = async () => {
  return Card.find().exec();
};

const findCardById = async (id) => {
  return Card.findOne({ _id: id }).exec();
};

const findCardsByName = async (name) => {
  return Card.find({ name }).exec();
};

export default { createCard, findAllCards, findCardById, findCardsByName };
