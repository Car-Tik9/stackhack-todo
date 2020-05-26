import React, { useEffect, useState } from "react";
import { useContext } from "react";
//Material Components
import { Button } from "@material-ui/core";
import TodoApi from "../api/TodoApi";
import AddTodo from "./AddTodo";
import OcrDialog from "./OcrDialog/OcrDialog";
//Custom Components
import TodoDialog from "./TodoDialog";
import ToDoList from "./ToDoList";
import { userContext } from "../utils/userContext";

function Dashboard() {
  const user = useContext(userContext);
  useEffect(() => {
    TodoApi.get(`/todo/getTodos/${user.email}`)
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

  const [anchorEl, setAnchorEl] = React.useState({});

  const menuButtonClick = (event,id) => {
    setAnchorEl({...anchorEl, [id]:event.currentTarget});
  };

  const menuItemClick = (id) => {
    setAnchorEl({...anchorEl, [id]:null});
  };

  const addTodo = (todo) => {
    TodoApi.post("/todo/addTodo", { ...todo , username : user.email})
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
    menuItemClick(id);
    const todosNew =  todos.map(todo => (todo._id === id ? Object.assign({},todo,{priority}) : todo));
    setTodos(todosNew)
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
