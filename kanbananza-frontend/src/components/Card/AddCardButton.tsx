import React, { useState, useEffect } from "react";
import { card } from "../../types/card";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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

const AddCardButton = (cardProps: any) => {
  const [cardData, setCardData] = useState<card | undefined>(cardProps);
  const classes = useStyles();
  useEffect(() => {
    // sync props with state
    setCardData(cardProps);
  }, [cardProps]);

  return (
    <div onClick={cardProps.onShow}>
      <Card className={`${classes.root} btn-outline-secondary`}>
        <CardContent>
          <Typography className={classes.title}>Add a new card</Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default AddCardButton;
