import React from "react";

//Material Components
import { Button, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from "@material-ui/core";
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
import Checkbox from '@material-ui/core/Checkbox';

//Thirdparty packages
import Moment from 'react-moment';



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
  console.log(props)
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
              <TableCell className={classes.headerCell}></TableCell>
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
                  <Checkbox
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </TableCell>

                <TableCell align="left">{todo.title}</TableCell>

                <TableCell align="left"  aria-controls={index} aria-haspopup="true" onClick={event=> {props.menuButtonClick(event,todo._id)}}>
                  {todo.priority}
                </TableCell>
                <Menu
                    id={index}
                    anchorEl={props.anchorEl[todo._id]}
                    keepMounted
                    open={Boolean(props.anchorEl[todo._id])}
                    onClose={() => {props.menuItemClick(todo._id)}}
                    elevation={1}
                  >
                    <MenuItem onClick={() => props.changePriority(todo._id, 3)}>High</MenuItem>
                    <MenuItem onClick={() => props.changePriority(todo._id, 2)}>Medium</MenuItem>
                    <MenuItem onClick={() => props.changePriority(todo._id, 1)}>Low</MenuItem>
                  </Menu>
                

				        <TableCell align="left"><Chip size="small" className={classes.textInfo}label={todo.status}/></TableCell>

                <TableCell align="left">
                  <Moment format="Do MMM YYYY">
                    {todo.duedate}
                  </Moment>
                </TableCell>

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
          <Button align="end" variant="outlined" size="small" color="primary">
            View Archieved
          </Button>
      </CardActions>
    </Card>
  );
};

export default ToDoList;
