import React, { useState, useEffect } from "react";
import { board } from "../../types/board";
import CreateCardComponent from "../Card/CreateCardModal";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getBoardColumns } from "../../api/boardApi";
import Column from "./Column/Column";
import { createColumn } from "../../api/columnApi";
import { card } from "../../types/card";
import { DragDropContext } from "react-beautiful-dnd";
import { deleteCard, getColumnCards } from "../../api/cardApi";

interface columnContainer {
  name: string;
  id: string;
  boardId: string;
  order: number;
  cards: Array<card>;
}

interface boardContainer {
  columns: Array<columnContainer>;
  id: string;
  ownerId: string;
  name: string;
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
  const history = useHistory();
  const [modalShowCard, setModalShowCard] = React.useState(false);
  const [boardData, setBoardData] = useState<boardContainer>({
    columns: [],
    id: history.location.state.board.id,
    name: history.location.state.board.name,
    ownerId: history.location.state.board.id,
  });

  async function initializeData() {
    let board: board = history.location.state.board;
    const colListRes = await getBoardColumns(history.location.state.board.id);
    if (colListRes.length) {
      let newBoard: boardContainer = {
        columns: [],
        id: board.id,
        name: board.name,
        ownerId: board.ownerId,
      };
      for (const column of colListRes) {
        const cardListRes = await getColumnCards(column.id);
        let newColumn: columnContainer = {
          name: column.name,
          id: column.id,
          order: column.order,
          boardId: column.boardId,
          cards: cardListRes,
        };
        newBoard.columns.push(newColumn);
      }
      setBoardData(newBoard);
    }
  }
  useEffect(() => {
    if (history.location.state.board) {
      initializeData();
    }
  }, []);

  const setColumns = (newColumns: Array<columnContainer>) => {
    setBoardData({
      columns: newColumns,
      id: boardData.id,
      name: boardData.name,
      ownerId: boardData.ownerId,
    });
  };

  const onAddColumn = async () => {
    if (boardData) {
      const order = boardData.columns.length + 1; //TODO the backend should take care of this?
      let colRes = await createColumn({
        name: "New Column - " + order,
        boardId: boardData.id,
        order: order,
      });
      if (colRes) {
        let newColumnData = [...boardData.columns];
        const newCol: columnContainer = {
          cards: [],
          name: colRes.name,
          boardId: colRes.boardId,
          order: colRes.order,
          id: colRes.id,
        };
        newColumnData.push(newCol);
        setColumns(newColumnData);
      } else {
        console.log("error creating column");
      }
    } else {
      console.log("no board data");
    }
  };

  const addCard = (card: card) => {
    let newColumnData = [...boardData.columns];
    let newCardData = [...boardData.columns[0].cards];
    newCardData.push(card);
    newColumnData[0].cards = newCardData;
    setColumns(newColumnData);
  };

  const deleteCrd = async (card: card) => {
    const status = card.id && await deleteCard(card.id)
    if(status === 204){
    let newColumnData = [...boardData.columns];
    let newCardData = [...boardData.columns[0].cards];
    newCardData =  newCardData.filter(crd => crd.id != card.id)
    newColumnData[0].cards = newCardData;
    setColumns(newColumnData);
    } else {
      console.log('an error has happened')
    }
  }

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
    const newColumns = reorder(
      boardData.columns,
      result.source.index,
      result.destination.index
    );
    setColumns(newColumns);
  };

  const onInnerDragEnd = (result) => {
    // TODO: update order on backend
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const subCardMap = boardData.columns.reduce((acc, column) => {
      acc[column.id] = column.cards;
      return acc;
    }, {});
    const sourceParentId = result.source.droppableId;
    const destParentId = result.destination.droppableId;

    const sourceColumnCards = subCardMap[sourceParentId];
    const destColumnCards = subCardMap[destParentId];

    let newColumnData = [...boardData.columns];
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
        }
        return column;
      });
      setColumns(newColumnData);
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
      setColumns(newColumnData);
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
        <Column deleteCrd={deleteCrd} columns={boardData} onShow={onShowCardModal} />
      </DragDropContext>

      <CreateCardComponent
        show={modalShowCard}
        onHide={() => setModalShowCard(false)}
        order={0}
        columns={boardData.columns}
        onAddCard={(card) => addCard(card)}
      />
    </>
  );
};

export default Board;
