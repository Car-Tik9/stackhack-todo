//Material Components
import AddIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useState, Fragment } from "react";
import TodoApi from "../api/TodoApi";
import { userContext } from "../utils/userContext";
import AddTodo from "./AddTodo";
import EmptyData from "./EmptyData";
import OcrDialog from "./OcrDialog/OcrDialog";
import TodoSnackBar from "./snackbar/TodoSnackBar";

//Custom Components
import TodoDialog from "./TodoDialog";
import ToDoList from "./ToDoList";
import PageLoader from "../utils/PageLoader";
import PopoverButton from "./PopoverButton";
import AddTodoButton from './Dashboard/AddTodoButton';
import ArchievedButton from './Dashboard/ArchievedButton';
import Sort from './Dashboard/Sort';
import Filters from './Dashboard/Filters';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonConatainer: {
    display: "flex",
    height: 30,
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  button: {
    marginRight: 8,
  },
}));

function Dashboard() {
  const user = useContext(userContext);

  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [isOpenDlg, setisOpenDlg] = useState(false);
  const [currentTodo, setCurrentTodo] = useState();
  const [editing, setEditing] = useState(false);
  const [openOcrDlg, setOpenOcrDlg] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterLabel, setFilterLabel] = useState([]);
  const [filterValue, setFilterValue] = useState([]);
  const [reload, setReload] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [message,setMessage] = useState('');

  useEffect(() => {
    TodoApi.get(`/todo/getTodos/${user.email}`)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setTodos(res.data.todos);
          setReload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const addTodo = (todo) => {
    TodoApi.post("/todo/addTodo", { ...todo, username: user.email })
      .then((res) => {
        if (res.status === 200) {
          setTodos([...todos, res.data.todo]);
          setOpenSnack(true)
          setMessage("Todo Added Successfully")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = (_id) => {
    TodoApi.post("/todo/deleteTodo", { _id })
      .then((res) => {
        if (res.status === 200) {
          setTodos(todos.filter((todo) => todo._id !== _id));
          setOpenSnack(true)
          setMessage("Todo Deleted Successfully")
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

  const changePriority = (_id, priority) => {
    TodoApi.post("/todo/updatePriority", { _id, priority })
      .then((res) => {
        if (res.status === 200) {
          const todosNew = todos.map((todo) =>
            todo._id === _id ? Object.assign({}, todo, { priority }) : todo
          );
          setTodos(todosNew);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeStatus = (_id, status) => {
    TodoApi.post("/todo/updateStatus", { _id, status })
      .then((res) => {
        if (res.status === 200) {
          if (status === 3) {
            setTodos(todos.filter((todo) => todo._id !== _id));
          } else {
            const todosNew = todos.map((todo) =>
              todo._id === _id ? Object.assign({}, todo, { status }) : todo
            );
            setTodos(todosNew);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTodo = (updatedTodo) => {
    setEditing(false);
    TodoApi.post("/todo/updateTodo", { ...updatedTodo })
      .then((res) => {
        if (res.status === 200) {
          setTodos(
            todos.map((todo) =>
              todo._id === updatedTodo._id ? updatedTodo : todo
            )
          );
          setOpenSnack(true)
          setMessage("Todo Updated Successfully")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeCompleted = (_id, completed) => {
    TodoApi.post("/todo/updateCompleted", { _id, completed })
      .then((res) => {
        if (res.status === 200) {
          setTodos(todos.filter((todo) => todo._id !== _id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDialogClose = () => {
    setEditing(false);
    setisOpenDlg(false);
  };

  const filterMethod = (label, value) => {
    setIsFiltered(true);
    setFilterLabel(label);
    setFilterValue(value);
    filterTodos(label, value);
  };

  const clearFilters = () => {
    setIsFiltered(false);
    setFilterLabel([]);
    setFilterValue([]);
  };

  const filterTodos = (filterLabel, filterValue) => {
    const filteredTodos = [...todos].filter((todo) => {
      return todo[filterLabel] === filterValue;
    });
    setFilteredTodos(filteredTodos);
  };

  const hadleClose = () => {
    setOpenSnack(false);
    setMessage('');
  }

  const classes = useStyles();

  const DashBoardContent = () => {
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
        <OcrDialog
          open={openOcrDlg}
          setReload={setReload}
          handleDialogClose={setOpenOcrDlg}
        />
        <AddTodo addTodo={addTodo} />  
        <div className={classes.buttonConatainer}>
          <PopoverButton handleOpen={setOpenOcrDlg}/>
          <AddTodoButton setisOpenDlg={setisOpenDlg}/>
          <ArchievedButton />
          <Sort todos={todos} setTodos={setTodos} clearFilters={clearFilters}/>
          <Filters isFiltered={isFiltered} filterMethod={filterMethod} clearFilters={clearFilters}/>
        </div>
        <TodoSnackBar open={openSnack} message={message} handleClose={hadleClose}/>
        {
          todos.length > 0 ? (
            <ToDoList
              todos={todos}
              deleteTodo={deleteTodo}
              addTodo={setisOpenDlg}
              editTodo={editTodo}
              changePriority={changePriority}
              changeCompleted={changeCompleted}
              changeStatus={changeStatus}
              isFiltered={isFiltered}
              filteredTodos={filteredTodos}
            />
          ) : (
            <EmptyData
              height={500}
              message="Create your first Todo"
              setisOpenDlg={setisOpenDlg}
            ><AddIcon style={{fontSize:150}}onClick={() => setisOpenDlg(true)}></AddIcon></EmptyData>
          )
        }
      </div>
    );
  }

  return (    
    isLoading ? <PageLoader /> : <DashBoardContent />
  );
}

export default Dashboard;
