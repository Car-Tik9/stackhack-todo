import React, { useState } from 'react';

//Material Components
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const ToDoForm = (props) => {
	
	const initialToDoState = { 
		id: null, 
		title: '', 
		description: '',
		priority: ''
	}

	const [todo, setTodo] = useState(initialToDoState);

	const handleInputChange = (e) => {

		const { name, value } = e.target;

    	setTodo({ 
			...todo,
			[name]: value 
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if( !todo.title || !todo.description || !todo.priority )
			return;

		props.addTodo(todo);
		setTodo(initialToDoState);
	}

	return (
		<form onSubmit={handleSubmit}>

			<FormControl>
				<TextField
					label="Title" 
					variant="outlined" 	
					type="text" 
					name="title" 
					value={todo.title} 
					onChange={handleInputChange} 
				/>
			</FormControl>
			<FormControl>
				<TextField
					label="Description" 
					variant="outlined" 	
					type="text" 
					name="description" 
					value={todo.description} 
					onChange={handleInputChange} 
				/>
			</FormControl>
			<FormControl variant="outlined">
				<InputLabel id="priority">Priority</InputLabel>
				<Select
					htmlFor="priority"
					name="priority" 
					value={todo.priority} 
					onChange={handleInputChange}
				>
					<MenuItem value=""><em>Select</em></MenuItem>
					<MenuItem value={1}>High</MenuItem>
					<MenuItem value={2}>Medium</MenuItem>
					<MenuItem value={3}>Low</MenuItem>
				</Select>
			</FormControl>
			<div className="form-group">
				<button>Add Todo</button>
			</div>
		</form>
	);
}

export default ToDoForm;
