import React, { useState, useEffect } from "react";
import { column } from "../../../types/column";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { card } from "../../../types/card";
import { getColumnCards } from "../../../api/cardApi";
import { editColumnName, deleteColumn } from "../../../api/columnApi";
import CardComponent from "../../Card/Card";
import AddCardButton from "../../Card/AddCardButton";

import { Draggable, Droppable } from "react-beautiful-dnd";
import EditableLabel from "react-inline-editing";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
const Column = (columnProps: column) => {
  // will probably require props
  const [columnData, setColumnData] = useState<column>({
    name: "",
    id: "",
    boardId: "",
    order: -1,
  }); // initialize the variable to empty string
  const [cards, setCards] = useState<card[]>([]);
  const classes = useStyles();

  useEffect(() => {
    async function initializeData() {
      const res = await getColumnCards(columnProps.id);
      setCards(res);
    }
    setColumnData(columnProps);
    initializeData();
  }, [columnProps]);

  // get the cards from the column id --> do api call
  function _handleFocus(text) {
    console.log("Focused with text: " + text);
  }

  function _handleFocusOut(text) {
    console.log("Left editor with text: " + text);
    editColumnName(columnData.id, text);
  }

  const onDelete = ()=> {
    console.log("hdfghgfhfgd");
    deleteColumn(columnData.id)

  }
  return (
    <>
      <Grid item>
        <Draggable
          key={columnData.id}
          draggableId={`column-${columnData.id}`}
          index={columnData.order}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Paper className={classes.column}>
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
                <DeleteOutlineIcon onClick={onDelete}/>
                </Grid>
                </Grid>
                
                <CardComponent cards={cards} type={columnData.id} />
                {columnData.order == 0 && (
                  <AddCardButton onShow={columnProps.onShow} />
                )}
              </Paper>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      </Grid>
    </>
  );
};

export default Column;
