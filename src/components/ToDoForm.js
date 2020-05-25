import React, { useState } from "react";

//Material Components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(1),
  },
}));

const ToDoForm = (props) => {
  const initialToDoState = {
    id: null,
    title: "",
    description: "",
    priority: 1,
    status:1,
  };
  const classes = useStyles();
  console.log(classes);
  const todoState = props.isEditing  ? props.todo  : initialToDoState;
  const [todo, setTodo] = useState(todoState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.title || !todo.description || !todo.priority) return;
    
    if(props.isEditing){
      props.updateTodo(todo);
    }else{
      props.addTodo(todo);
    }
    setTodo(initialToDoState);
    props.handleDialogClose(false);
  };

  const handleDialogClose = () =>{
    setTodo(initialToDoState);
    props.handleDialogClose(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            size="small"
            name="title"
            value={todo.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            type="text"
            variant="outlined"
            name="description"
            value={todo.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={5}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined">
            <InputLabel id="priority">Priority</InputLabel>
            <Select
              autoWidth
              native
              size="small"
              name="priority"
              label="Priority"
              value={todo.priority}
              onChange={handleInputChange}
            >
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined">
            <InputLabel id="status">Status</InputLabel>
            <Select
              autoWidth
              native
              size="small"
              name="status"
              label="status"
              value={todo.status}
              onChange={handleInputChange}
            >
              <option value={1}>New</option>
              <option value={2}>In Progress</option>
              <option value={3}>Completed</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row-reverse">
            <Button type="submit" variant="contained" color="primary">
            {props.isEditing ? "Edit Todo" :"Add Todo" }
            </Button>
            <Button
              onClick={ handleDialogClose}
              className={classes.margin}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ToDoForm;
