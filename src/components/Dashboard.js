import React, { useEffect, useState } from "react";
import { useContext } from "react";
//Material Components
import { Button, IconButton } from "@material-ui/core";
import TodoApi from "../api/TodoApi";
import AddTodo from "./AddTodo";
import OcrDialog from "./OcrDialog/OcrDialog";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SortIcon from "@material-ui/icons/Sort";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

//Custom Components
import TodoDialog from "./TodoDialog";
import ToDoList from "./ToDoList";
import { userContext } from "../utils/userContext";
import EmptyData from "./EmptyData";

function Dashboard() {
  const user = useContext(userContext);

  const [todos, setTodos] = useState([]);
  const [isOpenDlg, setisOpenDlg] = useState(false);
  const [currentTodo, setCurrentTodo] = useState();
  const [editing, setEditing] = useState(false);
  const [openOcrDlg, setOpenOcrDlg] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = React.useState(null);

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

 
  const handleSortCllck = (event) => {
    setSortAnchorEl(event.currentTarget);
  } 

  const hanndleMenuClose = () => {
    setSortAnchorEl(null)
  }

  const handleMenuItemclick = (sortType) => {
    hanndleMenuClose();
    setSortType(sortType);
  }

  const addTodo = (todo) => {
    TodoApi.post("/todo/addTodo", { ...todo, username: user.email })
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
    TodoApi.post("/todo/deleteTodo", { _id })
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

  const changePriority = (_id, priority) => {
   // menuItemClick(_id);
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeCompleted = (_id, completed) => {
    console.log(completed);
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

  const [sortType, setSortType] = useState();
  const [search, setSearch] = useState(null);

  const searchTodo = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  }

  useEffect(() => {
    const sortTodos = (sortType) => {
      console.log("sortType: " + sortType);

      const sortedTodos = [...todos].sort(function (a, b) {
        return b[sortType] - a[sortType];
      });

      setTodos(sortedTodos);
      console.log(todos);
    };

    sortTodos(sortType);
  }, [sortType]);

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
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpenOcrDlg(true)}
      >
        Open OCR Dialog
      </Button>
      <OcrDialog open={openOcrDlg} handleDialogClose={setOpenOcrDlg} />
      <AddTodo addTodo={addTodo} />

      {/* START: Todo Controls */}

      <Card>
        <CardContent>
          {/* START: SEARCH */}
          <TextField 
            label="Search Your Todo"
            onChange={ (e) => searchTodo(e)}
            size="small"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* END: SEARCH */}
          {/* START: SORT BUTTON */}
          <Button variant="outlined" size="small" startIcon={<SortIcon />} onClick={handleSortCllck} >
            Sort
          </Button>
          <Menu
            id="sort-todo"
            anchorEl={sortAnchorEl}
            keepMounted
            open={Boolean(sortAnchorEl)}
            onClose={hanndleMenuClose}
            elevation={1}
          >
            <MenuItem onClick={() => { handleDialogClose("") }}><em>Sort by</em></MenuItem>
            <MenuItem onClick={() => { handleMenuItemclick("priority"); }}>Priority</MenuItem>
            <MenuItem onClick={() => { handleMenuItemclick("dueDate");}}>Due date</MenuItem>
            <MenuItem onClick={() => {handleMenuItemclick("status");}}>Status</MenuItem>
          </Menu>
          {/* END: SORT BUTTON */}
          {/* START: FILTERS */}
          <Button variant="outlined" size="small" startIcon={<SortIcon />} onClick={handleSortCllck} >
            Filters
          </Button>
          <Menu
            id="sort-todo"
            anchorEl={sortAnchorEl}
            keepMounted
            open={Boolean(sortAnchorEl)}
            onClose={hanndleMenuClose}
            elevation={1}
          >
            <MenuItem onClick={() => { handleDialogClose("") }}><em>Sort by</em></MenuItem>
            <MenuItem onClick={() => { handleMenuItemclick("priority"); }}>Priority</MenuItem>
            <MenuItem onClick={() => { handleMenuItemclick("dueDate");}}>Due date</MenuItem>
            <MenuItem onClick={() => {handleMenuItemclick("status");}}>Status</MenuItem>
          </Menu>
          {/* END: FILTERS */}
        </CardContent>
      </Card>
      <br></br>
      
      {/* END: Todo COntrols */}

      {todos.length > 0 ? (
        <ToDoList
          todos={todos}
          deleteTodo={deleteTodo}
          addTodo={setisOpenDlg}
          editTodo={editTodo}
          changePriority={changePriority}
          changeCompleted={changeCompleted}
          changeStatus={changeStatus}
          search={search}
        />
      ) : (
        <EmptyData message="Create your first Todo" />
      )}
    </div>
  );
}

export default Dashboard;
