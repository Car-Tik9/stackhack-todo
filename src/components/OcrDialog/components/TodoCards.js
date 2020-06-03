import React, { useState, Fragment } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import PriorityMenuItem from "../../MenuItems/PriorityMenuItem";
import StatusMenuItem from "../../MenuItems/StatusMenuItem";
import EmptyData from "../../EmptyData";
import MoodBad from "@material-ui/icons/MoodBadRounded"
const TodoCard = (props) => {
  const formTodos = () => {
    const todoArray = [];
    props.todos.forEach((title, index) => {
      let todoObject = {};
      todoObject._id = index;
      todoObject.title = title;
      todoObject.status = 1;
      todoObject.priority = 1;
      todoObject.description = "";
      todoArray.push(todoObject);
    });
    return todoArray;
  };

  const handlePriorityChange = (id, priority) => {
    console.log(id, priority);
    const todosNew = todos.map((todo) =>
      todo._id === id ? Object.assign({}, todo, { priority }) : todo
    );
    setTodos(todosNew);
  };

  const handleStatusChange = (id, status) => {
    console.log(id, status);
    const todosNew = todos.map((todo) =>
      todo._id === id ? Object.assign({}, todo, { status }) : todo
    );
    setTodos(todosNew);
  };

  const deleteTodo = (id) => {
    const todosNew = todos.filter((todo) => todo._id !== id);
    setTodos(todosNew);
  };

  const [todos, setTodos] = useState(formTodos());
  if(props.confidence < 60){
        return (
        <Fragment>
            <EmptyData icon={MoodBad} message="We Could not process Uploaded Image"/>
        </Fragment>
        )
  }
  return todos.map((todo) => (
    <Card style={{ marginBottom: 8 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField value={todo.title} fullWidth></TextField>
          </Grid>
          <Grid item xs={2}>
            <PriorityMenuItem
              handlePriorityChange={handlePriorityChange}
              todo={todo}
            />
          </Grid>
          <Grid item xs={2}>
            <StatusMenuItem
              handleStatusChange={handleStatusChange}
              todo={todo}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton size="small" onClick={() => deleteTodo(todo._id)}>
              <DeleteIcon style={{ color: "#d11a2a" }} />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ));
};

export default TodoCard;
