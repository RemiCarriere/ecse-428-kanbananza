import API from "./api";
import { column } from "../types/column";

export const createCard = (cardData): any => {
  return API.post("/card", cardData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
