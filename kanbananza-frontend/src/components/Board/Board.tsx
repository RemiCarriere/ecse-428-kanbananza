import React, { useState, useEffect } from "react";
import { board } from "../../types/board";
import CardComponent from "../Card/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { useHistory } from 'react-router-dom'
import { getAllBoards, getBoardColumns, getBoardById } from '../../api/boardApi'
import Column from './Column/Column'
import { createColumn } from '../../api/columnApi'
// use effect is similar to componentDidMount and componentDidUpdate and component will unmount
// use effect runs after each render!!
// each render occurs after a set state
/***
 * Experienced JavaScript developers might notice that the function passed to useEffect is
 * going to be different on every render. This is intentional. In fact, this is what lets us
 * read the count value from inside the effect without worrying about it getting stale.
 * Every time we re-render, we schedule a different effect, replacing the previous one.
 * In a way, this makes the effects behave more like a part of the render result — each effect “belongs”
 * to a particular render. We will see more clearly why this is useful later on this page.
 */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      alignItems: "center",
      justify: "center",
    },
    card: {
      padding: theme.spacing(2),
      textAlign: 'center',
      margin: '15px',
      color: theme.palette.text.secondary,
    },
  }),
);

const Board = () => {
  // will probably require props
  const [boardData, setBoardData] = useState<board | undefined>(undefined); // initialize the variable to empty string
  const [columnName, setColumnName] = useState<string>("")
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    if (history.location.state) {
      setBoardData(history.location.state.board)
    }
  }, [])

  const getColumns = () => {
    var cols = [];
    if (boardData) {
      console.log('I get here')
      cols = getBoardColumns(boardData.id)
    }
    console.log(cols)
  }
  const onAddColumn = () => {
    if (columnName && boardData) {
      createColumn({ name: columnName, boardId: boardData.id, order: 1 })
    } else {
      console.log("empty name")
    }
  }
  const onCreateCard = () => {
    const columnList = getColumns()
    history.push({ pathname: '/createCard', state: { columnList: columnList, boardData: boardData } })
  }

  return (
    <>
      <div className={classes.root}>
        <input type="text" onChange={(e) => setColumnName(e.target.value)}></input>
        <button onClick={onAddColumn}>Add Column</button>
        <button onClick={onCreateCard}>Create Card</button>
        <div><strong>placeholder for board name</strong></div>
        <Grid alignItems="center" justify="center" container spacing={4}>
          <Grid item>
            <Paper className={classes.card}>
              <IconButton style={{ left: '40%', padding: '0px', margin: '0px' }} aria-label="delete">
                <HighlightOffIcon />
              </IconButton>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.card}>
              <IconButton style={{ left: '40%', padding: '0px', margin: '0px' }} aria-label="delete">
                <HighlightOffIcon />
              </IconButton>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.card}>
              <IconButton style={{ left: '40%', padding: '0px', margin: '0px' }} aria-label="delete">
                <HighlightOffIcon />
              </IconButton>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
              <CardComponent className={classes.card} {...undefined}></CardComponent>
              <CardComponent className={classes.card}{...undefined}></CardComponent>
            </Paper>
          </Grid>
        </Grid>

      </div>
      {/*here we will do something like boardData.columns.map(column=> <Column></Column>)*/}
      {/*same thing in the column compoenent with cards*/}
    </>
  );
};

export default Board;
