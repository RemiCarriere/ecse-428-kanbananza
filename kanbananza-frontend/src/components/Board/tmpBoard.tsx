import React, { useState, useEffect } from "react";
import { board } from "../../types/board";
import CardComponent from "../Card/Card";
import CreateCardComponent from "../Card/CreateCard";
import Grid from "@material-ui/core/Grid";
import {
    makeStyles,
    createStyles,
    Theme
}
    from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useHistory } from "react-router-dom";
import {
    getAllBoards,
    getBoardColumns,
    getBoardById,
} from "../../api/boardApi";
import Column from "./Column/Column";
import { createColumn } from "../../api/columnApi";
import { column } from "../../types/column";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
// use effect is similar to componentDidMount and componentDidUpdate and component will unmount
// use effect runs after each render!!
// each render occurs after a set state
/***
 * Experienced JavaScript developers might notice that the function passed to useEffect is
 * going to be different on every render. This is intentional. In fact, this is what lets us
 * read the count value from inside the effect without worrying about it getting stale.
 * Every time we re-render, we schedule a different effect, replacing the previous one.
 * In a way, this makes the effects behave more like a part of the render result — each effect “belongs”
 * to a particular render. We will see more clearly why this is useful later on this page.
 */

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

const TmpBoard = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    // will probably require props
    const [boardData, setBoardData] = useState<board>({
        id: "",
        name: "",
        ownerId: "",
    });
    const [columnName, setColumnName] = useState<string>("");
    const [columnList, setColumnList] = useState<column[]>([])

    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        if (history.location.state.board) {
            setBoardData(history.location.state.board);
        }
        if (boardData)
            setColumnList(getColumns(history.location.state.board.id))
    }, [boardData])
    const getColumns = (boardId: string): column[] => {
        var cols = [];
        console.log("I get here");
        cols = getBoardColumns(boardId);
        console.log(cols)
        return cols
    };
    const onAddColumn = () => {
        if (columnName && boardData) {
            const order = columnList.length + 1
            createColumn({ name: columnName, boardId: boardData.id, order: order });
        } else {
            console.log("empty name");
        }
    };
    const grid = 8
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    return (
        <>
            <div className={classes.root}>
                <DragDropContext >
                    <Grid alignItems="center" justify="center" container spacing={4}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <Grid item>
                                        <Draggable key={'item-1'} draggableId={'item1-id'} index={1}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <CardComponent
                                                        className={classes.card}
                                                        {...undefined}
                                                    ></CardComponent>
                                                </div>
                                            )}
                                        </Draggable>
                                        <Draggable key={'item-2'} draggableId={'item2-id'} index={2}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <CardComponent
                                                        className={classes.card}
                                                        {...undefined}
                                                    ></CardComponent>
                                                </div>
                                            )}
                                        </Draggable>
                                        <Draggable key={'item-3'} draggableId={'item3-id'} index={3}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <CardComponent
                                                        className={classes.card}
                                                        {...undefined}
                                                    ></CardComponent>
                                                </div>
                                            )}
                                        </Draggable>
                                    </Grid>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Grid>
                </DragDropContext>
            </div>
            {/*here we will do something like boardData.columns.map(column=> <Column></Column>)*/}
            {/*same thing in the column compoenent with cards*/}
        </>
    );
};

export default TmpBoard;

