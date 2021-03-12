import API from "./api";
import { column } from "../types/column";

export const createCard = (cardData): any => {
  return API.post("/card", cardData)
    .then((res) => console.log(res))
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
