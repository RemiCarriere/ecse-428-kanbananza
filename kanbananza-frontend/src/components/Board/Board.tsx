import React, { useState, useEffect } from "react";
import { board } from "../../types/board";
import CreateCardComponent from "../Card/CreateCard";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getBoardColumns } from "../../api/boardApi";
import Column from "./Column/Column";
import { createColumn } from "../../api/columnApi";
import { card } from "../../types/card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getColumnCards } from "../../api/cardApi";

interface columnContainer {
  name: string;
  id: string;
  boardId: string;
  order: number;
  cards: Array<card>;
}

interface boardContainer {
  columns: Array<columnContainer>;
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
  const [boardData, setBoardData] = useState<board>({
    id: "",
    name: "",
    ownerId: "",
  });
  const [boardContainerData, setBoardContainerData] = useState<boardContainer>({ columns: [] });
  const history = useHistory();

  useEffect(() => {
    async function initializeData() {
      const colListRes = await getBoardColumns(history.location.state.board.id);
      if (colListRes[0]) {
        let b: boardContainer = { columns: [] };
        for (const element of colListRes) {
          const cardListRes = await getColumnCards(element.id);
          let a: columnContainer = {
            name: element.name,
            id: element.id,
            order: element.order,
            boardId: element.boardId,
            cards: cardListRes,
          };
          b.columns.push(a);
          setBoardContainerData(b);
        }
      }
    }
    if (history.location.state.board) {
      setBoardData(history.location.state.board);
      initializeData();
    }
  }, [boardData]);

  const onAddColumn = () => {
    if (boardData) {
      const order = boardContainerData.columns.length + 1;
      createColumn({
        name: "New Column - " + order,
        boardId: boardData.id,
        order: order,
      });
    } else {
      console.log("no board data");
    }
  };

  const reorder = (list, startIndex, endIndex): Array<columnContainer> => {
    const result: Array<columnContainer> = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const reorderInner = (list, startIndex, endIndex): Array<card> => {
    const result: Array<card> = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onOuterDragEnd = (result) => {
    const items = reorder(
      boardContainerData.columns,
      result.source.index,
      result.destination.index
    );
    setBoardContainerData({ columns: items });
  };

  const onInnerDragEnd = (result) => {
    console.log("dropping sub-item");
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const itemSubItemMap = boardContainerData.columns.reduce((acc, item) => {
      acc[item.id] = item.cards;
      return acc;
    }, {});
    const sourceParentId = result.source.droppableId;
    const destParentId = result.destination.droppableId;

    const sourceSubItems = itemSubItemMap[sourceParentId];
    const destSubItems = itemSubItemMap[destParentId];

    let newItems = [...boardContainerData.columns];

    if (sourceParentId === destParentId) {
      console.log("here")
      const reorderedSubItems = reorderInner(
        sourceSubItems,
        sourceIndex,
        destIndex
      );
      newItems = newItems.map((item) => {
        if (item.id === sourceParentId) {
          item.cards = reorderedSubItems;
          item.cards = item.cards.filter(function( element ) {
            return element !== undefined;
          });
        }
        return  item;
      })
      console.log(newItems[1].cards)
      setBoardContainerData({columns:newItems})
    }
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log(boardContainerData.columns[1].cards)
    if (result.type === "droppableItem") {
      onOuterDragEnd(result);
    } else if (result.type === "droppableSubItem") {
      onInnerDragEnd(result);
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
        <Column columns={boardContainerData} onShow={onShowCardModal} key="asdsd" />
      </DragDropContext>

      <CreateCardComponent
        show={modalShowCard}
        onHide={() => setModalShowCard(false)}
        order={0}
        columns={boardContainerData.columns}
      />
    </>
  );
};

export default Board;
