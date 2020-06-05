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
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import PriorityMenuItem from "../../MenuItems/PriorityMenuItem";
import StatusMenuItem from "../../MenuItems/StatusMenuItem";
import EmptyData from "../../EmptyData";
import MoodBad from "@material-ui/icons/MoodBadRounded";
import PropagateLoader from "react-spinners/PropagateLoader";
import TodoApi from "../../../api/TodoApi";
import { userContext } from "../../../utils/userContext";
const TodoCard = (props) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      marginTop: theme.spacing(1),
      padding: "8px 16px",
    },
    cardContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "0px !important",
      justifyContent: "space-around",
    },
    button: {
      marginRight: 8,
    },
    buttonContainer: {
      marginTop: 16,
    },
  }));
  const user = useContext(userContext);
  const classes = useStyles();
  const [processing , setProcessing] = useState(false);
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
  const [todos, setTodos] = useState(formTodos());
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
    setProcessing(true);
    const todosNew = todos.map((todo) => {
      delete todo._id;
      return todo;
    });
    TodoApi.post("/todo/addBulkTodos", todosNew)
      .then((res) => {
        if (res.status === 200) {
          setTodos([]);
          setProcessing(false);
          props.handleNext();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  if (props.confidence < 60) {
    return (
      <Fragment>
        <EmptyData
          message="We Could not process Uploaded Image"
        ><MoodBad style={{fontSize:150}}></MoodBad></EmptyData>
        <Typography variant="h6" align="center" component="h3">
          Please Upload Another Image with proper text and try again..!!
          </Typography>
        <Box
        className={classes.buttonContainer}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          className={classes.button}
          variant="contained"
          onClick={props.handleBack}
        >
          Back
        </Button>
      </Box>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
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
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
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
      <Box display="flex" justifyContent="center" marginTop="24px">
        <PropagateLoader color="#6200EE" loading={processing} />
      </Box>
      <Box
        className={classes.buttonContainer}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          className={classes.button}
          variant="contained"
          onClick={props.handleBack}
        >
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
