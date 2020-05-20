import React, { Fragment, useState } from 'react';

//Material Components


//Custom Components
import IntialCard from './IntialCard';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';

function Dashboard() {

	const todoData = [
		{ id: 1, title: 'Hooks', description: 'Create CRUD app with React Hooks', priority: 'High' },
		{ id: 2, title: 'Class', description: 'Create CRUD app w/o React Hooks', priority: 'Low' },
		{ id: 3, title: 'RR', description: 'Create CRUD app with Hooks + Redux', priority: 'Medium' },
	];

	const [todos, setTodos] = useState(todoData);

	const addTodo = (todo) => {		
		todo.id = todos.length + 1;
		setTodos([...todos, todo]);
	}

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	return (
		<Fragment>
			<ToDoForm addTodo={addTodo}/>
			<ToDoList 
				todos={todos}
				deleteTodo={deleteTodo}
			/>
			<IntialCard />
		</Fragment>
	)
}

export default Dashboard;