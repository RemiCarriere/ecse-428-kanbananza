import Card from "../models/card";
import HttpError from "../http_error";
import ValidationError from "../validation_error";

const createCard = async ({ name, columnId, order }) => {
  if (await Card.exists({ columnId, name })) {
    throw new ValidationError({
      path: "name",
      reason: "card name already in use for column.",
      data: name,
    });
  }
  return Card.create({ name, columnId, order });
};

const findAllCards = async () => {
  return Card.find().exec();
};

const findCardById = async (id) => {
  if (!(await Card.exists({ _id: id }))) {
    throw new HttpError({
      code: 404,
      message: `Card with id ${id} does not exist.`,
    });
  }
  return Card.findOne({ _id: id }).exec();
};

export default { createCard, findAllCards, findCardById };
