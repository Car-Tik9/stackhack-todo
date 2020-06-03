import React, { useState, Fragment, useContext } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Box,
  Button,
  Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import PriorityMenuItem from "../../MenuItems/PriorityMenuItem";
import StatusMenuItem from "../../MenuItems/StatusMenuItem";
import EmptyData from "../../EmptyData";
import MoodBad from "@material-ui/icons/MoodBadRounded";
import TodoApi from "../../../api/TodoApi";
import { userContext } from "../../../utils/userContext";
const TodoCard = (props) => {
  const user = useContext(userContext);
  const formTodos = () => {
    const todoArray = [];
    props.todos.forEach((title, index) => {
      let todoObject = {};
      todoObject._id = parseInt(index);
      todoObject.title = title;
      todoObject.status = 1;
      todoObject.priority = 1;
      todoObject.description = "";
      todoObject.username = user.email;
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

  const addTodos = () => {
    const todosNew = todos.map((todo) => {
      delete todo._id;
      return todo;
    });
    TodoApi.post("/todo/addBulkTodos", todosNew)
      .then((res) => {
        if (res.status === 200) {
            setTodos([]);
            props.handleNext();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [todos, setTodos] = useState(formTodos());
  if (props.confidence < 60) {
    return (
      <Fragment>
        <EmptyData
          icon={MoodBad}
          message="We Could not process Uploaded Image"
        />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="h5" component="h1">
                Title of todo{" "}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" component="h1">
                {" "}
                Priority
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" component="h1">
                Status{" "}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {todos.map((todo) => (
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
      ))}
      <Box display="flex" justifyContent="flex-end">
        <Button variant="default" color="primary">
          Back
        </Button>
        <Button onClick={addTodos} variant="contained" color="primary">
          Add Todos
        </Button>
      </Box>
    </Fragment>
  );
};

export default TodoCard;
