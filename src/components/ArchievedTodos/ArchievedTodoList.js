import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Slide,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import {getChipLabel} from '../../utils/todoUtils'

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    padding: 8,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px !important",
    justifyContent:'space-around'
  },
}));
const ArchievedTodoList = (props) => {
  const classes = useStyles();
  return props.todos.map((todo, index) => (
    <Slide
      direction="right"
      in={true}
      style={{ transitionDelay: 600 * index + "ms" }}
    >
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Checkbox checked={false} onChange={() => props.changeCompleted(todo._id, false)}></Checkbox>
          <Typography variant="body1">{todo.title}</Typography>
          {getChipLabel(todo.chipId)}
        </CardContent>
      </Card>
    </Slide>
  ));
};

export default ArchievedTodoList;
