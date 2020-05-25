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
  const todoData = [
    {
      id: 1,
      title: "Hooks",
      description: "Create CRUD app with React Hooks",
      priority: "High",
    },
    {
      id: 2,
      title: "Class",
      description: "Create CRUD app w/o React Hooks",
      priority: "Low",
    },
    {
      id: 3,
      title: "RR",
      description: "Create CRUD app with Hooks + Redux",
      priority: "Medium",
    },
  ];
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
    TodoApi.post("/todo/deleteTodo", _id)
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
      />
    </div>
  );
}

export default Dashboard;
