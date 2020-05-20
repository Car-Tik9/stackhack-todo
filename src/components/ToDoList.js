import React from 'react';

const ToDoList = ( props ) => {

	return (
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Description</th>
					<th>Priority</th>
					<th>Actions</th>
				</tr>
			</thead>
				<tbody>
					{
						props.todos.map( (todo, index) => (
							<tr key={index}>
								<td>{todo.title}</td>
								<td>{todo.description}</td>
								<td>{todo.priority}</td>
								<td>
									<button>Edit</button>
									<button 
										onClick={() => props.deleteTodo(todo.id)}>Delete</button>
								</td>
							</tr>
						))
					}
				</tbody>
		</table>
	)
}

export default ToDoList;
