import React, { useState } from "react";

//Material Components
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Container, Grid, Button } from "@material-ui/core";

const ToDoForm = (props) => {
  const initialToDoState = {
    id: null,
    title: "",
    description: "",
    priority: "",
  };

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
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              type="text"
              name="title"
              value={todo.title}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
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
            <Button type="submit" variant="contained" color="primary">
              Add To Do
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ToDoForm;
