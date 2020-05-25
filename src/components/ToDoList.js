import { Button, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from "@material-ui/core";
//Material Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from "react";



const useStyles = makeStyles((theme) => ({
	cardContentPadding: {
	  padding: 0,
	},
	tableHeader:{
		backgroundColor:'#fafafa',
		textTransform:'uppercase',
		fontSize:12,
		padding:10
	},
	divider:{
		height:2
	},
	headerCell:{
		padding:8
	},
	icon:{
		marginRight:theme.spacing(2)
	},
	textDanger:{
		color:'#f83245'
	},
	textInfo:{
		color:'#11c5db'
	},
	textWarning:{
		color:'#f4772e'
	},
}));
const ToDoList = (props) => {

  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        disableTypography={true}
		    title={<Typography variant="h5" component="div">Todo</Typography>}
		    action={
          <Button
            align="end"
            variant="outlined"
            onClick={props.addTodo}
            size="small"
            color="primary"
            startIcon={<AddIcon/>}
          >
            Add Todo
          </Button>
        }
      ></CardHeader>
      <CardContent className={classes.cardContentPadding}>
        {/* <TableContainer> */}
        <Table aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.headerCell}>#</TableCell>
              <TableCell className={classes.headerCell} align="left">Title</TableCell>
              <TableCell className={classes.headerCell} align="left">Priority</TableCell>
			        <TableCell className={classes.headerCell} align="left">Status</TableCell>
              <TableCell className={classes.headerCell} align="left">Due date</TableCell>
              <TableCell className={classes.headerCell} align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.todos.map((todo, index) => (
              <TableRow key={index}>

                <TableCell component="th" scope="todo">
                  {index}
                </TableCell>

                <TableCell align="left">{todo.title}</TableCell>

                <TableCell align="left" >
                  <Button aria-controls={index} aria-haspopup="true" onClick={props.menuButtonClick}>
                    {todo.priority}
                  </Button>
                  <Menu
                    id={index}
                    anchorEl={props.anchorEl}
                    keepMounted
                    open={Boolean(props.anchorEl)}
                    onClose={props.menuItemClick}
                    elevation={1}
                  >
                    <MenuItem onClick={() => props.changePriority(todo._id, 1)}>Critical</MenuItem>
                    <MenuItem onClick={() => props.changePriority(todo._id, 2)}>High</MenuItem>
                    <MenuItem onClick={() => props.changePriority(todo._id, 3)}>Medium</MenuItem>
                    <MenuItem onClick={() => props.changePriority(todo._id, 4)}>Low</MenuItem>
                    <MenuItem onClick={() => props.changePriority(todo._id, 5)}>Very Low</MenuItem>
                  </Menu>
                </TableCell>
                

				        <TableCell align="left"><Chip size="small" className={classes.textInfo}label={todo.status}/></TableCell>

                <TableCell align="left">{todo.duedate}</TableCell>

                <TableCell align="left">
                  <IconButton size="small" className={classes.icon}
                  onClick ={() => props.editTodo(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => props.deleteTodo(todo._id)}
                  >
                    <DeleteIcon style={{color:'#d11a2a'}}/>
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </TableContainer> */}
      </CardContent>
      <CardActions>
          <Button align="end" variant="outlined" size="small" color="primary">
            View All
          </Button>
      </CardActions>
    </Card>
  );
};

export default ToDoList;
