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

const findCardsByName = async (name) => {
  return Card.find({ name }).exec();
};

export default { createCard, findAllCards, findCardById, findCardsByName };
