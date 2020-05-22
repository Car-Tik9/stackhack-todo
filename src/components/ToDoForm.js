import React, { useState } from "react";

//Material Components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import { Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
    priority: "",
  };
  const classes = useStyles();
  console.log(classes);
  const [todo, setTodo] = useState(initialToDoState);

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

    props.addTodo(todo);
    setTodo(initialToDoState);
    props.isOpenDlg(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>

          <Input
            type="text"
            name="title"
            placeholder="title"
            value={todo.title}
            onChange={handleInputChange}
          />

          {/* <TextField
            label="Title"
            type="text"
            name="title"
            value={todo.title}
            onChange={handleInputChange}
            fullWidth
          /> */}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            type="text"
            name="description"
            value={todo.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel id="priority">Priority</InputLabel>
            <Select
              size="small"
              htmlFor="priority"
              name="priority"
              value={todo.priority}
              autoWidth={true}
              native
              onChange={handleInputChange}
            >
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row-reverse">
            <Button type="submit" variant="contained" color="primary">
              Add To Do
            </Button>
            <Button
              onClick={() => props.isOpenDlg(false)}
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
