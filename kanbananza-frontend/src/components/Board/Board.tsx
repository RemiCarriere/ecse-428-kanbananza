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
  const [boardContainerData, setBoardContainerData] = useState<boardContainer>({
    columns: [],
  });
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
      // Needs to be fixed to update board component dynamically
      // if boards is added to useEffect() as dependency,
      // it works, but we get an infinite loop
      // https://dmitripavlutin.com/react-useeffect-infinite-loop/
      window.location.reload(); //TODO remove this line when issue above is solved
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
    // TODO: update order on backend
    const items = reorder(
      boardContainerData.columns,
      result.source.index,
      result.destination.index
    );
    setBoardContainerData({ columns: items });
  };

  const onInnerDragEnd = (result) => {
    // TODO: update order on backend
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const subCardMap = boardContainerData.columns.reduce((acc, column) => {
      acc[column.id] = column.cards;
      return acc;
    }, {});
    const sourceParentId = result.source.droppableId;
    const destParentId = result.destination.droppableId;

    const sourceColumnCards = subCardMap[sourceParentId];
    const destColumnCards = subCardMap[destParentId];

    let newColumnData = [...boardContainerData.columns];
    // Dropped in source column
    if (sourceParentId === destParentId) {
      const reorderedColumnCards = reorderInner(
        sourceColumnCards,
        sourceIndex,
        destIndex
      );
      newColumnData = newColumnData.map((column) => {
        if (column.id === sourceParentId) {
          column.cards = reorderedColumnCards;
          column.cards = column.cards.filter(function (card) {
            return card !== undefined;
          });
        }
        return column;
      });
      setBoardContainerData({ columns: newColumnData });
    }
    // Dropeed in different column
    else {
      let newSourceColCards = [...sourceColumnCards];
      const [draggedItem] = newSourceColCards.splice(sourceIndex, 1);
      let newDestColCards = [...destColumnCards];
      newDestColCards.splice(destIndex, 0, draggedItem);
      newColumnData = newColumnData.map((column) => {
        if (column.id === sourceParentId) {
          column.cards = newSourceColCards;
        } else if (column.id === destParentId) {
          column.cards = newDestColCards;
        }
        return column;
      });
      setBoardContainerData({ columns: newColumnData });
    }
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
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
        <Column
          columns={boardContainerData}
          onShow={onShowCardModal}
          key="asdsd"
        />
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
