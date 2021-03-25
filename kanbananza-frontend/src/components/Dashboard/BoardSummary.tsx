import { useState, useEffect } from "react";
import { checkToken, getUserBoards } from "../../api/userApi";
import Cookies from "js-cookie";
import { board } from "../../types/board";
import { Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {deleteBoard } from '../../api/boardApi'

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
      <div>
      <button
        type="button"
        style={{display: 'inline-block'}}
        className="btn btn-outline-secondary"
        onClick={() => handleClick(props.board)}
      >
        See more
      </button>
      <button
        style={{display: 'inline-block', margin: '5px'}}
        type="button"
        className="btn btn-outline-danger"
        onClick={() => props.deleteBrd(props.board)}
      >
        Delete
      </button>
      </div>
    </div>
  );
};
export default BoardSummary;
