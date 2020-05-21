import React ,{useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import ToDoForm from './ToDoForm'


const TodoDialog = (props) => {
    return (<Dialog open={props.open} onClose={() => props.isOpenDlg(false)}>
        <DialogTitle>
                Add Todo
        </DialogTitle>
        <DialogContent>
            <ToDoForm addTodo={props.addTodo} isOpenDlg={props.isOpenDlg}/>
        </DialogContent>
    </Dialog>)
} 


export default TodoDialog