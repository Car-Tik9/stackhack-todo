import React, { useState } from 'react'
import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import { getPriorityButton , getStatusButton, getChipLabel } from "../../../utils/todoUtils"
import DeleteIcon from "@material-ui/icons/Delete";
import PriorityMenuItem from '../../MenuItems/PriorityMenuItem';
import StatusMenuItem from '../../MenuItems/StatusMenuItem';
const TodoCard  = (props) => {

    const formTodos = () =>{
        const todoArray = [];
        props.todos.forEach((title,index) => {
            let todoObject = {};
            todoObject._id = index
            todoObject.title = title;
            todoObject.status = 1;
            todoObject.priority = 1;
            todoObject.description ='';
            todoArray.push(todoObject);
        })
        return todoArray;
    }

    const handlePriorityChange = (id,priority) => {
        console.log(id,priority)
        const todosNew = todos.map((todo) =>
            todo._id === id ? Object.assign({}, todo, { priority }) : todo
          );
          setTodos(todosNew);
    } 

    const handleStatusChange = (id,status) => {
        console.log(id,status)
        const todosNew = todos.map((todo) =>
            todo._id === id ? Object.assign({}, todo, { status }) : todo
          );
          setTodos(todosNew);
    } 
    const [todos , setTodos] = useState(formTodos())

    return(
        todos.map((todo)=> (
            <Card style={{marginBottom:8}}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField value={todo.title} fullWidth></TextField>
                        </Grid>
                        <Grid item xs={2}>
                            <PriorityMenuItem handlePriorityChange={handlePriorityChange}todo={todo}/>
                        </Grid>
                        <Grid item xs={2}>
                           <StatusMenuItem handleStatusChange ={handleStatusChange} todo={todo}/>
                        </Grid>
                        <Grid item xs={2}>
                           <DeleteIcon style={{ color: "#d11a2a" }}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        ))
    )
} 

export default TodoCard