import React, { useState, useEffect } from "react";
import { column } from "../../../types/column";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Paper } from "@material-ui/core";

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
  const classes = useStyles()
  useEffect(() => {
    setColumnData(columnProps)
  }, [columnProps])

  // get the cards from the column id --> do api call 

  return (
    <>
      <Paper className={classes.column}>
        <h3>{columnData.name}</h3>
        {/** map over the cards and display them */}
      </Paper>
    </>
  );
};

export default Column;
