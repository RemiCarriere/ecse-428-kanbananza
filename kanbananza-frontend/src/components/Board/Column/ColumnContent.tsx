import React, { useState, useEffect } from "react";
import { column } from "../../../types/column";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { card } from "../../../types/card";
import { editColumnName, deleteColumn } from "../../../api/columnApi";
import EditableLabel from "react-inline-editing";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
      padding: theme.spacing(2),
      textAlign: "center",
      margin: "15px",
      color: theme.palette.text.secondary,
      minHeight: "50vh",
      minWidth: "24vh",
      maxWidth: "24vh",
    },
    root: {
      minWidth: 150,
      margin: "10px",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })
);
const ColumnContent = (columnProps: any) => {
  // will probably require props
  const [columnData, setColumnData] = useState<column>({
    name: columnProps.col.name,
    id: columnProps.col.id,
    boardId: columnProps.col.boardId,
    order: columnProps.col.order,
  }); // initialize the variable to empty string

  useEffect(() => {
    setColumnData({
      name: columnProps.col.name,
      id: columnProps.col.id,
      boardId: columnProps.col.boardId,
      order: columnProps.col.order,
    });
  }, [columnProps]);

  // get the cards from the column id --> do api call
  function _handleFocus(text) {
    console.log("Focused with text: " + text);
  }

  function _handleFocusOut(text) {
    console.log("Left editor with text: " + text);
    editColumnName(columnData.id, text);
  }

  const onDelete = () => {
    deleteColumn(columnData.id);
    // Needs to be fixed to update board component dynamically
    // if boards is added to useEffect() as dependency,
    // it works, but we get an infinite loop
    // https://dmitripavlutin.com/react-useeffect-infinite-loop/
    window.location.reload(); //TODO remove this line when issue above is solved
  };
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        justify="space-between"
        spacing={4}
      >
        <Grid item>
          <h3>
            <EditableLabel
              text={columnData.name}
              labelClassName="myLabelClass"
              inputClassName="myInputClass"
              inputWidth="200px"
              inputHeight="25px"
              inputMaxLength={20}
              labelFontWeight="bold"
              inputFontWeight="bold"
              onFocus={_handleFocus}
              onFocusOut={_handleFocusOut}
            />
          </h3>
        </Grid>
        <Grid item>
          <DeleteOutlineIcon onClick={onDelete} />
        </Grid>
      </Grid>
    </>
  );
};

export default ColumnContent;
