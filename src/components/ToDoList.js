import React, { useState, Fragment } from "react";

//Material Components
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import history from "../utils/history";

//Thirdparty packages
import Moment from "react-moment";

import { getPriorityChip , getStatusChip, getChipLabel } from "../utils/todoUtils";

const useStyles = makeStyles((theme) => ({
  cardContentPadding: {
    padding: 0,
  },
  tableHeader: {
    backgroundColor: "#fafafa",
    textTransform: "uppercase",
    fontSize: 12,
    padding: 10,
  },
  divider: {
    height: 2,
  },
  headerCell: {
    padding: 8,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  textDanger: {
    color: "#f83245",
  },
  textInfo: {
    color: "#11c5db",
  },
  textWarning: {
    color: "#f4772e",
  },
}));
const ToDoList = (props) => {
  
  const [search, setSearch] = useState(null);
  const [anchorEl,setAnchorEl] = useState([]);

  const handleStatusButtonClick = (event,id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  }
  const handleMenuClose = (id) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  }

  const handleMenuItemClick = (id,status) =>{
    handleMenuClose(id)
    props.changeStatus(id,status);
  }

  const handleArchievedClick = () => {
    history.push('/view-archieved')
  }

  const searchTodo = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  }

  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        disableTypography={true}
        title={
          <Typography variant="h5" component="div">
            Todo
          </Typography>
        }
        action={
          <Fragment>
             <TextField 
              label="Search Your Todo"
              onChange={ (e) => searchTodo(e)}
              size="small"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              align="end"
              variant="outlined"
              onClick={() => {
                props.addTodo(true);
              }}
              size="small"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Todo
            </Button>
          </Fragment>
        }
      ></CardHeader>
      <CardContent className={classes.cardContentPadding}>
        <Table aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.headerCell}></TableCell>
              <TableCell className={classes.headerCell} align="left">
                Title
              </TableCell>
              <TableCell className={classes.headerCell} align="left">

              </TableCell>
              <TableCell className={classes.headerCell} align="left">
                Priority
              </TableCell>
              <TableCell className={classes.headerCell} align="left">
                Status
              </TableCell>
              <TableCell className={classes.headerCell} align="left">
                Due date
              </TableCell>
              <TableCell className={classes.headerCell} align="left">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.todos.filter((todo)=>{
              if(search == null)
                return todo
              else if(todo.title.toLowerCase().includes(search.toLowerCase()) || todo.description.toLowerCase().includes(search.toLowerCase())){
                return todo
              }}).map((todo, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="todo">
                  <Checkbox checked={false}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    onChange={() => props.changeCompleted(todo._id, true)}
                  />
                </TableCell>
                <TableCell align="left">{todo.title}</TableCell>
                <TableCell align="left">{getChipLabel(todo.chipId)}</TableCell>
                <TableCell align="left" aria-controls={index}>
                  <div
                    onClick={(event) => {
                      props.menuButtonClick(event, todo._id);
                    }}
                  >
                    {getPriorityChip(todo.priority)}
                  </div>
                </TableCell>
                <Menu
                  id={index}
                  anchorEl={props.anchorEl[todo._id]}
                  keepMounted
                  open={Boolean(props.anchorEl[todo._id])}
                  onClose={() => {
                    props.menuItemClick(todo._id);
                  }}
                  elevation={1}
                >
                  <MenuItem onClick={() => props.changePriority(todo._id, 3)}>
                    High
                  </MenuItem>
                  <MenuItem onClick={() => props.changePriority(todo._id, 2)}>
                    Medium
                  </MenuItem>
                  <MenuItem onClick={() => props.changePriority(todo._id, 1)}>
                    Low
                  </MenuItem>
                </Menu>
                <TableCell align="left">
                <div onClick={(event) => handleStatusButtonClick(event,todo._id)}>
                  {getStatusChip(todo.status)}
                </div>
                <Menu
                  id={index}
                  anchorEl={anchorEl[todo._id]}
                  keepMounted
                  open={Boolean(anchorEl[todo._id])}
                  onClose={() =>handleMenuClose(todo._id)}
                  elevation={1}
                >
                  <MenuItem onClick={ (event) => handleMenuItemClick(todo._id,1)}>
                    New
                  </MenuItem>
                  <MenuItem onClick={ (event) => handleMenuItemClick(todo._id,2)}>
                    In Progress
                  </MenuItem>
                  <MenuItem onClick={ (event) => handleMenuItemClick(todo._id,3)}>
                    Completed
                  </MenuItem>
                </Menu>
                </TableCell>
                <TableCell align="left">
                  <Moment format="Do MMM YYYY">{todo.dueDate}</Moment>
                </TableCell>

                <TableCell align="left">
                  <IconButton
                    size="small"
                    className={classes.icon}
                    onClick={() => props.editTodo(todo)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => props.deleteTodo(todo._id)}
                  >
                    <DeleteIcon style={{ color: "#d11a2a" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Button align="end" variant="outlined" size="small" color="primary">
          View All
        </Button>
        <Button onClick ={ handleArchievedClick}align="end" variant="outlined" size="small" color="primary">
          View Archieved
        </Button>
      </CardActions>
    </Card>
  );
};

export default ToDoList;
