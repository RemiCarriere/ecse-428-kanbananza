import React, { useState } from "react";
import { board } from "../../types/board";
import { createBoard, getBoardById, getAllBoards } from "../../api/boardApi";
import Board from "./Board";

const DisplayBoard = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [boardData, setBoardData] = useState<board | undefined>(undefined);

  const onCreateBoard = () => {
    if (name) {
      try {
        createBoard({ ownerId: "6028930e486dd03312c8cbab", name: name });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onViewBoard = () => {
    const res = getBoardById("602999111760f8845f5043e3");
    const res2 = getAllBoards();
    console.log(res2);
    console.log(res);
    setBoardData(res);
  };

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
        <button onClick={onCreateBoard}>Create Board</button>
        <button onClick={onViewBoard}>See Board</button>
        {boardData && <Board></Board>}
      </div>
    </>
  );
};
export default DisplayBoard;
