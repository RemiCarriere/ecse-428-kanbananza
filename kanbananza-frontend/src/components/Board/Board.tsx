import React, { useState, useEffect } from "react";
import { board } from "../../types/board";
import CreateCardComponent from "../Card/CreateCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  getAllBoards,
  getBoardColumns,
  getBoardById,
} from "../../api/boardApi";
import Column from "./Column/Column";
import { createColumn } from "../../api/columnApi";
import { column } from "../../types/column";
import { card } from "../../types/card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getColumnCards } from "../../api/cardApi";

interface columnCards{
  cards: Array<card>
}

interface boardCards{
  columns: Array<columnCards>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      alignItems: "center",
      justify: "center",
    },
    card: {
      padding: theme.spacing(2),
      textAlign: "center",
      margin: "15px",
      color: theme.palette.text.secondary,
    },
  })
);

const Board = (props) => {
  const [modalShowCard, setModalShowCard] = React.useState(false);
  const [modalShowdelete, setModalShowdelete] = React.useState(false);
  // will probably require props
  const [boardData, setBoardData] = useState<board>({
    id: "",
    name: "",
    ownerId: "",
  });
  const [columnList, setColumnList] = useState<Array<column>>([]);
  const [nextCardOrder, setnextCardOrder] = useState<number>(0);
  const [cardList, setcardList] = useState<boardCards>(
    {columns:[]}
  );

  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    async function initializeData() {
      const res = await getBoardColumns(history.location.state.board.id);
      setColumnList(res);
      if (res[0]) {
        const res1 = await getColumnCards(res[0].id);
        setnextCardOrder(res1.length);
        let b : boardCards = {columns:[]}
        for (const element of res){
          const res2= await getColumnCards(element.id);
          console.log(res2)
          let a :columnCards = res;
          b.columns.push(a)
          setcardList(b)
        }

      }
    }
    if (history.location.state.board) {
      setBoardData(history.location.state.board);
      initializeData();
    }
    // if (boardData) setColumnList(getColumns(history.location.state.board.id));
  }, [boardData]);

  const onAddColumn = () => {
    if (boardData) {
      const order = columnList.length + 1;
      createColumn({
        name: "New Column - " + order,
        boardId: boardData.id,
        order: order,
      });
    } else {
      console.log("empty name");
    }
  };

  const reorder = (list, startIndex, endIndex): Array<column> => {
    const result: Array<column> = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onOuterDragEnd = (result) => {
    const items = reorder(
      columnList,
      result.source.index,
      result.destination.index
    );
    setColumnList(items);
  }

  const onInnerDragEnd = (result) => {
    console.log("dropping sub-item")
    var data = React.Children.map(props.children, child => child);
    console.log(data)
    // const itemSubItemMap = this.state.items.reduce((acc, item) => {
    //   acc[item.id] = item.subItems;
    //   return acc;
    // }, {});

  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    if (result.type === "droppableItem") {
      onOuterDragEnd(result)
    }
    if (result.type === "droppableSubItem") {
      onInnerDragEnd(result)
     
    }
  };
  const onShowCardModal = () => {
    setModalShowCard(true);
  };

  return (
    <>
      <h3>
        <strong>{boardData.name}</strong>
      </h3>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onAddColumn}
      >
        Add Column
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
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
                {columnList.length &&
                  columnList.map((col, index) => (
                    <Column
                      boardId={col.boardId}
                      id={col.id}
                      order={index}
                      name={col.name}
                      key={col.id}
                      onShow={onShowCardModal}
                    />
                  ))}

                {provided.placeholder}
              </Grid>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <button onClick={onAddColumn}>Add Column</button> */}
      {/* <button type="button" className="btn btn-outline-secondary"onClick={onAddColumn}>Add Column</button> */}
      <CreateCardComponent
        show={modalShowCard}
        onHide={() => setModalShowCard(false)}
        order={nextCardOrder}
        columns={columnList} // TODO: switch to column list used empty array because othewrwise this will cause the modal to crash until the promise issue in get board columns
      />
    </>
  );
};

export default Board;
