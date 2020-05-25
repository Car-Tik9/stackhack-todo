//Material Components
import React, { useEffect, useState } from "react";

//Custom Components
import TodoDialog from "./TodoDialog";
import ToDoList from "./ToDoList";
import TodoApi from "../api/TodoApi";
import AddTodo from "./AddTodo";
import OcrDialog from "./OcrDialog/OcrDialog";
import { Button } from "@material-ui/core";

function Dashboard() {
  
  useEffect(() => {
    TodoApi.get("/todo/getTodos")
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data.todos);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [todos, setTodos] = useState([]);
  const [isOpenDlg, setisOpenDlg] = useState(false);
  const [currentTodo, setCurrentTodo] = useState();
  const [editing, setEditing] = useState(false);
  const [openOcrDlg, setOpenOcrDlg] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuItemClick = () => {
    setAnchorEl(null);
  };

  const addTodo = (todo) => {
    TodoApi.post("/todo/addTodo", { ...todo })
      .then((res) => {
        if (res.status === 200) {
          setTodos([...todos, res.data.todo]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = (_id) => {
    TodoApi.post("/todo/deleteTodo", {_id})
      .then((res) => {
        if (res.status === 200) {
          setTodos(todos.filter((todo) => todo._id !== _id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTodo = (todo) => {
	  setEditing(true);
	  setisOpenDlg(true);
    setCurrentTodo({ ...todo });
  };

  const changePriority = (id, priority) => {
    setTodos(todos.map(todo => (todo._id === id ? todo.priority = priority : todo)))
    console.log(todos);
  }

  const updateTodo = (updatedTodo) => {
	  setEditing(false);
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const handleDialogClose = () => {
	  setEditing(false);
	  setisOpenDlg(false);
  }

  return (
    <div style={{ margin: 16 }}>
      <TodoDialog
        open={isOpenDlg}
        updateTodo={updateTodo}
        isEditing={editing}
        addTodo={addTodo}
        handleDialogClose={handleDialogClose}
        todo={currentTodo}
      />
      <Button variant="outlined" color="primary" onClick={() => setOpenOcrDlg(true)}>Open OCR Dialog</Button>
      <OcrDialog open={openOcrDlg} handleDialogClose={setOpenOcrDlg}/>
      <AddTodo addTodo={addTodo}/>
      <ToDoList
        todos={todos}
        deleteTodo={deleteTodo}
        addTodo={setisOpenDlg}
        editTodo={editTodo}
        changePriority={changePriority}
        menuButtonClick={menuButtonClick}
        menuItemClick={menuItemClick}
        anchorEl={anchorEl}
      />
    </div>
  );
}

export default Dashboard;
