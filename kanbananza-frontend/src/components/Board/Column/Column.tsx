import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import CardComponent from "../../Card/Card";
import AddCardButton from "../../Card/AddCardButton";
import ColumnContent from "./ColumnContent";
import { Draggable, Droppable } from "react-beautiful-dnd";

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
const Column = (columnProps: any) => {
  const classes = useStyles();

  return (
    <>
      <Droppable
        type="droppableItem"
        droppableId="droppable"
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <Grid
              container
              direction="row"
              alignItems="stretch"
              justify="center"
              spacing={4}
            >
              {columnProps.columns &&
                columnProps.columns.columns.map((col, index) => (
                  <Grid item key={col.id}>
                    <Draggable
                      key={col.id}
                      draggableId={`column-${col.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Paper className={classes.column}>
                            <ColumnContent col={col} />

                            <CardComponent deleteCrd={columnProps.deleteCrd} cards={col.cards} type={col.id} />
                            {index == 0 && (
                              <AddCardButton onShow={columnProps.onShow} />
                            )}
                          </Paper>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  </Grid>
                ))}
              {provided.placeholder}
            </Grid>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
