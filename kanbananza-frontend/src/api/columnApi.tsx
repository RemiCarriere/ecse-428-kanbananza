import API from "./api";
import { column } from "../types/column";

export const createColumn = (columnData): any => {
  return API.post("/column", columnData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const editColumnName = (id: string, name: string): any => {
  return API.patch(`/column/${id}`, { name: name })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const deleteColumn = (columnId: string, order: number): any => {
  // what is this ? mark
  
  return API.delete(`/column/${columnId}`), API.post("/column/order", order - 1)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  
};
