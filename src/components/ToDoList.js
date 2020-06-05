import React, { Fragment, useState } from "react";


//Material Components
import { Card, CardContent, CardHeader, IconButton, InputAdornment, TableContainer, TextField, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from "@material-ui/icons/Edit";

//Thirdparty packages
import Moment from "react-moment";

import { getChipLabel } from "../utils/todoUtils";
import PriorityMenuItem from "./MenuItems/PriorityMenuItem";
import StatusMenuItem from "./MenuItems/StatusMenuItem";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 0,
  },
  tableHeader: {
    backgroundColor: "#fafafa",
    textTransform: "uppercase",
    fontSize: 12,
    padding: 12,
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
}));

const ToDoList = (props) => {
  const [search, setSearch] = useState(null);
  const searchTodo = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        disableTypography={true}
        title={
          <Typography variant="h5" component="h1">
            Todos
          </Typography>
        }
        action={
          <Fragment>
            <TextField
              label="Search Your Todo"
              onChange={(e) => searchTodo(e)}
              size="small"
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
          </Fragment>
        }
      ></CardHeader>
      <CardContent className={classes.cardContent}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.headerCell}></TableCell>
              <TableCell className={classes.headerCell} align="left">
                Title
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="left"
              ></TableCell>
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
            {(!props.isFiltered ? props.todos : props.filteredTodos)
              .filter((todo) => {
                if (search == null) return todo;
                else if (
                  todo.title.toLowerCase().includes(search.toLowerCase()) ||
                  todo.description.toLowerCase().includes(search.toLowerCase())
                ) {
                  return todo;
                }
              })
              .map((todo, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.headerCell} component="th" scope="todo">
                    <Tooltip title="Mark as Completed" arrow>
                      <Checkbox
                        inputProps={{ "aria-label": "primary checkbox" }}
                        onChange={() => props.changeCompleted(todo._id, true)}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell className={classes.headerCell} align="left">{todo.title}</TableCell>
                  <TableCell  className={classes.headerCell} align="left">
                    {getChipLabel(todo.chipId)}
                  </TableCell>
                  <TableCell align="left" className={classes.headerCell}>
                    <PriorityMenuItem
                      todo={todo}
                      handlePriorityChange={props.changePriority}
                    />
                  </TableCell>
                  <TableCell className={classes.headerCell} >
                    <StatusMenuItem
                      todo={todo}
                      handleStatusChange={props.changeStatus}
                    />
                  </TableCell>
                  <TableCell  className={classes.headerCell} align="left">
                    <Moment format="Do MMM YYYY">{todo.dueDate}</Moment>
                  </TableCell>

                  <TableCell  className={classes.headerCell} align="left">
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
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ToDoList;
