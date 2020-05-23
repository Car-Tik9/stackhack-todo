import React, { Fragment, useContext, useState ,useEffect } from 'react';

//utils
import { userContext } from '../utils/userContext';

//Material Components
import { Button, Typography, Container } from '@material-ui/core';

//Custom Components
import TodoDialog from './TodoDialog';
import ToDoList from './ToDoList';
import TodoApi from '../api/TodoApi'


function Dashboard() {
	const value =  useContext(userContext);
	const todoData = [
		{ id: 1, title: 'Hooks', description: 'Create CRUD app with React Hooks', priority: 'High' },
		{ id: 2, title: 'Class', description: 'Create CRUD app w/o React Hooks', priority: 'Low' },
		{ id: 3, title: 'RR', description: 'Create CRUD app with Hooks + Redux', priority: 'Medium' },
	];
	useEffect(() => {
		TodoApi.get('/todo/getTodos').then( res=> {
			if(res.status===200){
				setTodos(res.data.todos);
			}
		}).catch(err => {
			console.log(err);
		})
	},[])

	const [todos, setTodos] = useState(todoData);
	const [isOpenDlg , setisOpenDlg] = useState(false);

	const addTodo = (todo) => {		
		TodoApi.post('/todo/addTodo',{...todo}).then(res => {
				if(res.status === 200){
					setTodos([...todos, res.data.todo]);
				}
		}).catch( err => {
			console.log(err)
		})
	}

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}
	return (
		<Container>
			<Typography component="h1" variant="h6">{value.name}</Typography>
			<TodoDialog open={isOpenDlg} addTodo={addTodo} isOpenDlg={setisOpenDlg}/>
			<ToDoList 
				todos={todos}
				deleteTodo={deleteTodo}
			/>
			<Button color="primary" variant="contained" onClick={()=> setisOpenDlg(true)}>addTodo</Button>
		</Container>
	)
}

export default Dashboard;