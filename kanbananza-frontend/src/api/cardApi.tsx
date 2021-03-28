import API from "./api";
import { column } from "../types/column";

export const createCard = (cardData): any => {
  return API.post("/card", cardData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getAllCards = (): any => {
  return API.get("/cards")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getColumnCards = (columnId: string): any => {
  // what is this ? mark
  return API.get(`/column/${columnId}/cards`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
export const deleteCard = (id: string): any => {
  // what is this ? mark
  return API.delete(`/cards/${id}`)
    .then((res) => res.status)
    .catch((err) => err);
};
