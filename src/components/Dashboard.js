import React, { Fragment, useState } from 'react';

//Material Components


//Custom Components
import IntialCard from './IntialCard';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TodoDialog from './TodoDialog';
import { Button } from '@material-ui/core';

function Dashboard() {

	const todoData = [
		{ id: 1, title: 'Hooks', description: 'Create CRUD app with React Hooks', priority: 'High' },
		{ id: 2, title: 'Class', description: 'Create CRUD app w/o React Hooks', priority: 'Low' },
		{ id: 3, title: 'RR', description: 'Create CRUD app with Hooks + Redux', priority: 'Medium' },
	];

	const [todos, setTodos] = useState(todoData);
	const [isOpenDlg , setisOpenDlg] = useState(false);

	const addTodo = (todo) => {		
		todo.id = todos.length + 1;
		setTodos([...todos, todo]);
	}

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}
	//dummy commit
	return (
		<Fragment>
			<TodoDialog open={isOpenDlg} addTodo={addTodo} isOpenDlg={setisOpenDlg}/>
			<ToDoList 
				todos={todos}
				deleteTodo={deleteTodo}
			/>
			<IntialCard />
			<Button color="primary" variant="contained" onClick={()=> setisOpenDlg(true)}>addTodo</Button>
		</Fragment>
	)
}

export default Dashboard;