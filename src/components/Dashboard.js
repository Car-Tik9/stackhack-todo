//Material Components
import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TodoApi from '../api/TodoApi';
//Custom Components
import TodoDialog from './TodoDialog';
import ToDoList from './ToDoList';





function Dashboard() {
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

	const [todos, setTodos] = useState([]);
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
		setTodos(todos.filter(todo => todo._id !== id))
	}
	return (
		<Container style={{marginTop:16}}>
			<TodoDialog open={isOpenDlg} addTodo={addTodo} isOpenDlg={setisOpenDlg}/>
			<ToDoList 
				todos={todos}
				deleteTodo={deleteTodo}
				addTodo={setisOpenDlg}
			/>
		</Container>
	)
}

export default Dashboard;