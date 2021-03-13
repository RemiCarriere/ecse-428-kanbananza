import { card } from "./card";

export interface column {
  id: string;
  name: string;
  boardId: string;
  order: number;
  onShow?: VoidFunction;
  //cards: card[]
  // and other data we will get from the backend
}
