import React, { useState } from 'react'
import { Card, CardContent, Grid, TextField } from '@material-ui/core';

const TodoCard  = (props) => {

    const formTodos = () =>{
        const todoArray = [];
        props.todos.forEach((title) => {
            let todoObject = {};
            todoObject.title = title;
            todoObject.status = 1;
            todoObject.priority = 1;
            todoObject.description ='';
            todoArray.push(todoObject);
        })
        return todoArray;
    }
    const [todos , setTodos] = useState(formTodos())

    return(
        todos.map((todo)=> (
            <Card style={{marginBottom:8}}>
                <CardContent>‚
                    <Grid   container>
                        <Grid item xs={6}>
                            <TextField value={todo.title} fullWidth></TextField>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        ))
    )
} 

export default TodoCard