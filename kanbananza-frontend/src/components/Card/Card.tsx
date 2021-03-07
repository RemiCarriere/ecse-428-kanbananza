import React, { useState, useEffect } from "react";
import { card } from "../../types/card";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {
  Draggable
}
  from 'react-beautiful-dnd'

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
      {cardData &&
        <Draggable key={cardData.id} draggableId={`card-${cardData.id}`} index={cardData.order}>{/**mightneed to hardcode order while it is not ready */}
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.title}>{cardData ? cardData.name : 'Card Title'}</Typography>
                  <Typography className={classes.pos}>{cardData ? cardData.description : 'Description'}</Typography>
                  <Typography variant="body2" component="p">
                    bla bla bla
        </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </div>
          )}
        </Draggable>
      }
    </div>
  );
};

export default CardComponent;
