import React, { useState, useEffect } from "react";
import { card } from "../../types/card";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { Draggable, Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles({
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
});

const CardComponent = (cardProps: any) => {
  const [cardData, setCardData] = useState<card | undefined>(cardProps);
  const classes = useStyles();

  useEffect(() => {
    // sync props with state
    setCardData(cardProps);
  }, [cardProps]);

  return (
    <div>
      {cardProps.type && (
        <Droppable droppableId={cardProps.type} type={`droppableSubItem`}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {cardProps.cards.map((cardData, index) => (
                <Draggable
                  key={cardData.id}
                  draggableId={`card-${cardData.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card className={classes.root}>
                        <HighlightOffIcon style={{float: 'right'}} onClick={() => cardProps.deleteCrd(cardData)}>Delete</HighlightOffIcon>
                        <CardContent>
                          <Typography className={classes.title}>
                            {cardData ? cardData.name : "Card Title"}
                          </Typography>
                          <Typography variant="body2" component="p">
                            {cardData ? cardData.description : "Description"}
                          </Typography>
                        </CardContent>
                        <CardActions></CardActions>
                      </Card>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default CardComponent;
