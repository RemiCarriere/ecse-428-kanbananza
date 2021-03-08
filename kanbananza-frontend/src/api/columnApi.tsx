import API from "./api";
import { column } from "../types/column";

export const createColumn = (columnData): any => {
  return API.post("/column", columnData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const deleteColumn = (columnData): any => {
  API.delete("/column", columnData)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
}