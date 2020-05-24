import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  addTodoContainer: {
    margin: "16px 0",
    padding: theme.spacing(1.5),
    borderColor: theme.palette.primary.main,
    border: "2px dashed",
    borderRadius: theme.spacing(0.5),
  },
}));
const AddTodo = (props) => {
  const initialToDoState = {
    id: null,
    title: "",
    description: "",
    priority: 1,
    status: 1,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleAddClick = () =>{
      props.addTodo(todo);
      setTodo(initialToDoState)
  }

  const classes = useStyles();
  const [todo, setTodo] = useState(initialToDoState);
  return (
    <div className={classes.addTodoContainer}>
      <Grid container spacing={2}>
        <Grid item xs={10} md={11}>
          <TextField id="title" name="title"value={todo.title} onChange={handleInputChange} fullWidth placeholder="Add Todo here"></TextField>
        </Grid>
        <Grid item xs={2} md={1}>
          <Button onClick={handleAddClick} variant="contained" fullWidth color="inherit">
            
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default AddTodo;
