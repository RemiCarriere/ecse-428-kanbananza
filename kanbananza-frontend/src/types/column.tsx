import { card } from "./card";

export interface column {
  id: string;
  label: string;
  boardId: string;
  //cards: card[]
  // and other data we will get from the backend
}
