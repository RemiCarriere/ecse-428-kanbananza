import Card from "../models/card";
import ValidationError from "../validation_error";
import { isValidMongooseObjectId } from "../utils/validators";

const createCard = async ({ name, columnId, order, description, priority }) => {
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

  return Card.create({ name, columnId, order, description, priority });
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

const findCardsWithLargerOrder = async (colId, order) => {
  return Card.find({ columnId: colId, order: { $gte: order } })
    .sort("order")
    .exec();
};

const updateCardById = async (id, updatedInfo) => {
  if (
    updatedInfo.columnId !== undefined &&
    !isValidMongooseObjectId(updatedInfo.columnId)
  ) {
    throw new ValidationError({
      path: "columnId",
      reason: "column ID is invalid",
      data: updatedInfo.columnId,
    });
  }

  return Card.findByIdAndUpdate(id, updatedInfo, { new: true }); // see https://masteringjs.io/tutorials/mongoose/findoneandupdate
};

export default {
  createCard,
  findAllCards,
  findCardById,
  findCardsByName,
  updateCardById,
  findCardsWithLargerOrder,
};
