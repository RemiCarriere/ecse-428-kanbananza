import Card from "../models/card";
import HttpError from "../http_error";
import ValidationError from "../validation_error";

const createCard = async ({ name, columnId, order }) => {
  return Card.create({ name, columnId, order });
};

const findAllCards = async () => {
  return Card.find().exec();
};

const findCardById = async (id) => {
  return Card.findOne({ _id: id }).exec();
};

const findAllColumnCards = async (id) => {
  return Card.find({ columnId: id }).exec();
};

export default { createCard, findAllCards, findCardById, findAllColumnCards };
