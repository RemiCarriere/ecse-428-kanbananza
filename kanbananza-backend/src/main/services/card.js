import Card from "../models/card";
import HttpError from "../http_error";

const createCard = async ({ name, columnId, order }) => {
  if (await Card.exists({ columnId, name })) {
    throw new HttpError({
      code: 400,
      message: `Card name already in use for column with id ${columnId}.`,
    });
  }
  try {
    return await Card.create({ name, columnId, order });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      throw new HttpError({
        code: 400,
        message: "Invalid field(s)",
        body: Object.values(e.errors).map((error) => error.message),
      });
    } else {
      throw e;
    }
  }
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
