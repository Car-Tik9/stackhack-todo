import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Grid,
} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/styles";
import {getChipLabel, getStatusButton, getPriorityButton} from '../../utils/todoUtils'

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    padding: 8,
  },
  cardContent: {
    padding: "0px !important",
  },
}));
const ArchievedTodoList = (props) => {
  const classes = useStyles();
  return props.todos.map((todo, index) => (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container alignItems="center">
              <Grid item xs={1}>
                <Tooltip title="Mark as Open" arrow>
                  <Checkbox onChange={() => props.changeCompleted(todo._id, false)}></Checkbox>
                </Tooltip>
              </Grid>
              <Grid item xs={5}>
              <Typography variant="body1">{todo.title}</Typography>
              </Grid>
              <Grid item xs={2}>
                {getStatusButton(todo.status)}
              </Grid>
              <Grid item xs={2}>
                {getPriorityButton(todo.priority)}
              </Grid>
              <Grid item xs={2}>
                {getChipLabel(todo.chipId)}
              </Grid>
          </Grid>
        </CardContent>
      </Card>
  ));
};

export default ArchievedTodoList;
