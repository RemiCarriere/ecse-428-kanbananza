import { board } from "../types/board";
import API from "./api";

/** template */

export const createBoard = (boardData: board) => {
  return API.post("/board", {
    name: boardData.name,
    ownerId: boardData.ownerId,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
export const getAllBoards = (): any => {
  return API.get("/boards")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getBoardById = (id: string): any => {
  return API.get(`/board/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
