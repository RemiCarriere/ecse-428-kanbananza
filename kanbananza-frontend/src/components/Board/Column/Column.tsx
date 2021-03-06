import React, { useState, useEffect } from "react";
import { column } from "../../../types/column";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
      padding: theme.spacing(2),
      textAlign: "center",
      margin: "15px",
      color: theme.palette.text.secondary,
    },
  })
);
const Column = (columnProps: column) => {
  // will probably require props
  const [columnData, setColumnData] = useState<column>({
    label: "",
    id: "",
    boardId: "",
  }); // initialize the variable to empty string
  const classes = useStyles();
  useEffect(() => {
    setColumnData(columnProps);
  }, [columnProps]);

  return (
    <>
      <Paper className={classes.column}>
        <h3>{columnData.label}</h3>
        {/** map over the cards and display them */}
      </Paper>
    </>
  );
};

export default Column;
