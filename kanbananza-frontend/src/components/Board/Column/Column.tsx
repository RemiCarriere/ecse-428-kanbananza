import React, { useState, useEffect } from "react";
import { column } from "../../../types/column";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid, Paper } from "@material-ui/core";
import { card } from "../../../types/card";
import { getColumnCards } from "../../../api/cardApi";
import CardComponent from "../../Card/Card";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
      padding: theme.spacing(2),
      textAlign: 'center',
      margin: '15px',
      color: theme.palette.text.secondary,
    },
  }),
);
const Column = (columnProps: column) => {
  // will probably require props
  const [columnData, setColumnData] = useState<column>({ name: "", id: "", boardId: "", order: -1 }); // initialize the variable to empty string
  const [cards, setCards] = useState<card[]>([])

  const classes = useStyles()
  useEffect(() => {
    setColumnData(columnProps)
    setCards(getColumnCards(columnProps.id))
  }, [columnProps])

  // get the cards from the column id --> do api call 

  return (
    <>
      <Grid item>
        <Paper className={classes.column}>
          <h3>{columnData.name}</h3>
          {cards && cards.map((card) => <CardComponent name={card.name} description={card.description} order={card.order} columnId={card.columnId} priority={card.priority}></CardComponent>)}
        </Paper>
      </Grid>
    </>
  );
};

export default Column;
