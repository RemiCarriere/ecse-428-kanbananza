import Card from "../models/card";
import ValidationError from "../validation_error";
import { isValidMongooseObjectId } from "../utils/validators";

const createCard = async ({ name, columnId, order, description, priority }) => {
  const cardsOfColumn = await Card.find({ columnId }).exec();

  // let c;
  // for (let i = 0; i < cardsOfColumn.length; i++) {
  //   c = cardsOfColumn[i];
  //   if (c.order === order) {
  //     setCardOrderById(id, updatedInfo.order);
  //   }
  // }

  cardsOfColumn.forEach((card) => {
    if (card.order === order) {
      throw new ValidationError({
        path: "order",
        data: order,
        reason: "card order already in use for column",
      });
    }
  });

  let newCardOrder;
  if (order === undefined) {
    const cardWithGreatestOrder = await findColumnCardWithGreatestOrder(
      columnId
    );
    if (cardWithGreatestOrder === null) {
      newCardOrder = 0;
    } else {
      newCardOrder = cardWithGreatestOrder.order + 1;
    }
  } else {
    newCardOrder = order;
  }

  return Card.create({
    name,
    columnId,
    order: newCardOrder,
    description,
    priority,
  });
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
    await setCardOrderById(id, updatedInfo.order);
    delete updatedInfo.order;
  }

  return Card.findByIdAndUpdate(id, updatedInfo, { new: true }).exec(); // see https://masteringjs.io/tutorials/mongoose/findoneandupdate
};

const setCardOrderById = async (id, newOrder) => {
  const card = await findCardById(id);

  const cards = await findColumnCardsWithGreaterOrder(card.columnId, newOrder);

  let lastIncreasedOrder = newOrder;
  let c;
  for (let i = 0; i < cards.length; i += 1) {
    c = cards[i];

    if (c._id === id || c.order > lastIncreasedOrder) {
      break;
    }

    c.order += 1;
    // eslint-disable-next-line no-await-in-loop
    await c.save();

    lastIncreasedOrder += 1;
  }

  card.order = newOrder;
  return card.save();
};

const findColumnCardsWithGreaterOrder = async (columnId, order) => {
  return Card.find({ columnId, order: { $gte: order } })
    .sort({ order: "asc" })
    .exec();
};

const findColumnCardWithGreatestOrder = async (columnId) => {
  const result = await Card.find({ columnId })
    .sort({ order: "desc" })
    .limit(1)
    .exec();

  if (result.length === 0) {
    return null;
  }
  return result[0];
};

const deleteCardById = async (id) => {
  const card = await findCardById(id);

  const cards = await findColumnCardsWithGreaterOrder(
    card.columnId,
    card.order
  );

  let c;
  for (let i = 0; i < cards.length; i += 1) {
    c = cards[i];

    c.order += c.order - 1;
    // eslint-disable-next-line no-await-in-loop
    await c.save();
  }

  return Card.findByIdAndDelete(id).exec();
};

export default {
  createCard,
  findAllCards,
  findCardById,
  findCardsByName,
  updateCardById,
  setCardOrderById,
  deleteCardById,
};
