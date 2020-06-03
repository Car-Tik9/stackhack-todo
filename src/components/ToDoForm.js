import DateFnsUtils from "@date-io/date-fns";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import ChoiceChips from "../api/ChoiceChips";

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
    status: 1,
    dueDate: new Date(),
    isCompleted: false,
    chipId : 0
  };
  
  const classes = useStyles();
  const todoState = props.isEditing ? props.todo : initialToDoState;
  const [todo, setTodo] = useState(todoState);
  const [errorFlg, setErrorFlg] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleRadioGroupChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: parseInt(value),
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.title) {
      setErrorFlg(true);
      return;
    }
    if(errorFlg){
      setErrorFlg(false);
    }
    if (props.isEditing) {
      props.updateTodo(todo);
    } else {
      props.addTodo(todo);
    }
    setTodo(initialToDoState);
    props.handleDialogClose(false);
  };

  const handleDialogClose = () => {
    setTodo(initialToDoState);
    props.handleDialogClose(false);
  };

  const handleDateChange = (dueDate) => {
    setTodo({
      ...todo,
      dueDate: dueDate,
    });
  };

  const handleChipClick = (chipId) => {
    setTodo({
      ...todo,
      chipId
    });
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
            error={errorFlg}
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
        <Grid item xs={8}>
          <FormLabel component="legend">Priority</FormLabel>
          <RadioGroup
            label="Priority"
            value={todo.priority}
            onChange={handleRadioGroupChange}
            row={true}
            name="priority"
          >
            <FormControlLabel value={1} control={<Radio />} label="Low" />
            <FormControlLabel value={2} control={<Radio />} label="Medium" />
            <FormControlLabel value={3} control={<Radio />} label="High" />
          </RadioGroup>
        </Grid>
        <Grid item xs={4} style={{marginTop:16}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              inputVariant="outlined"
              id="date"
              format="MM/dd/yyyy"
              label="Due date"
              size="small"
              value={todo.dueDate}
              disablePast
              autoOk
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            label="Status"
            value={todo.status}
            onChange={handleRadioGroupChange}
            row={true}
            name="status"
          >
            <FormControlLabel value={1} control={<Radio />} label="New" />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="In Progress"
            />
            <FormControlLabel value={3} control={<Radio />} label="Completed" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
            <ChoiceChips chipId={todo.chipId} handleChipClick = {handleChipClick}/>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row-reverse">
            <Button type="submit" variant="contained" color="primary">
              {props.isEditing ? "Update Todo" : "Add Todo"}
            </Button>
            <Button
              onClick={handleDialogClose}
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
