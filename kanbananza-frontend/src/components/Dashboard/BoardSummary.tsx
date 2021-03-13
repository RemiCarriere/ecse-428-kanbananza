import { useState, useEffect } from "react";
import { checkToken, getUserBoards } from "../../api/userApi";
import Cookies from "js-cookie";
import { board } from "../../types/board";
import { Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

var ownerID;
const BoardSummary = (props) => {
  const history = useHistory();

  const handleClick = (board) => {
    history.push({ pathname: "/board", state: { board: board } }); // test this
  };

  return (
    <div className="board-button">
      <h3>{props.board.name}</h3>
      <div className="accent-color"></div>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros.
      </p>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => handleClick(props.board)}
      >
        see more
      </button>
    </div>
  );
};
export default BoardSummary;
