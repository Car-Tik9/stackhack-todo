import React, { useContext, useEffect, useState, Fragment } from "react";
import { userContext } from "../../utils/userContext";
import TodoApi from "../../api/TodoApi";
import ArchievedTodoList from "./ArchievedTodoList";
import { Typography } from "@material-ui/core";
import EmptyData from "../EmptyData";
import HighLighOff from '@material-ui/icons/HighlightOffRounded'

const ArchievedTodosMain = () => {
  const user = useContext(userContext);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    TodoApi.get(`/todo/getArchivedTodos/${user.email}`)
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data.todos);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" component="h1">
            Archieved Todos
      </Typography>
      {todos.length > 0 ? (
        
          <ArchievedTodoList
            changeCompleted={changeCompleted}
            todos={todos}
          ></ArchievedTodoList>
      ) : (
        <EmptyData  height={500} icon ={HighLighOff} message='No Archieved todos '/>
      )}
    </div>
  );
};

export default ArchievedTodosMain;
