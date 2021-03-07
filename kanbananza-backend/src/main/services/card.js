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

  if (order === undefined) {
    const greatestOrder = (await findColumnCardWithGreatestOrder(columnId)).order;
    order = greatestOrder + 1;
  }

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

  if (updatedInfo.order !== undefined) {
    setCardOrderById(id, updatedInfo.order);
    delete updatedInfo.order;
  }
  
  return Card.findByIdAndUpdate(id, updatedInfo, { new: true }); // see https://masteringjs.io/tutorials/mongoose/findoneandupdate
};

const findColumnCardsWithGreaterOrder = async (columnId, order) => {
  return Card.find({ columnId, order: { $gte: order } })
    .sort({order: "asc"})
    .exec();
};

const findColumnCardWithGreatestOrder = async (columnId) => {
  return Card.find({columnId}).sort({order: "asc"}).limit(1).exec();
};

const setCardOrderById = (id, newOrder) => {
  const card = await findCardById(id);

  const cards = await findColumnCardsWithGreaterOrder(
    card.columnId,
    newOrder
  );

  let lastIncreasedOrder = newOrder;
  let c;
  for (let i = 0; i < cards.length; i += 1) {
    c = cards[i];

    if (c.order > lastIncreasedOrder) {
      break;
    }

    c.order = c.order + 1;
    await c.save();

    lastIncreasedOrder += 1;
  }
};

export default {
  createCard,
  findAllCards,
  findCardById,
  findCardsByName,
  updateCardById,
  setCardOrderById,
};
