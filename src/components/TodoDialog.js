import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import ToDoForm from './ToDoForm'


const TodoDialog = (props) => {
    return (
        <Dialog open={props.open}>
            <DialogTitle>{props.isEditing ? "Edit Your Todo" :"Add New Todo" }</DialogTitle>
            <DialogContent>
                <ToDoForm addTodo={props.addTodo} todo={props.todo}
                isEditing={props.isEditing} updateTodo={props.updateTodo} handleDialogClose={props.handleDialogClose}/>
            </DialogContent>
        </Dialog>
    )
} 


export default TodoDialog