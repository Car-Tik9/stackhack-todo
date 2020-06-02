import React, { Fragment, useState } from "react";
import { MenuItem, Menu } from "@material-ui/core";
import {getPriorityButton} from '../../utils/todoUtils' 
function PriorityMenuItem(props) {

const [priorityAnchorEl,setPriorityAnchorEl] = useState([]);
  const handlePriorityButtonClick = (event, id) => {
    setPriorityAnchorEl({ ...priorityAnchorEl, [id]: event.currentTarget });
  };

  const handlePriorityMenuClose = (id) => {
    setPriorityAnchorEl({ ...priorityAnchorEl, [id]: null });
  };
  

  const handlePriorityItemClick = (id, priority) => {
    handlePriorityMenuClose(id);
    props.handlePriorityChange(id, priority);
  };
 
  return (
    <Fragment>
      <div
        onClick={(event) => {
          handlePriorityButtonClick(event, props.todo._id);
        }}
      >
        {getPriorityButton(props.todo.priority)}
      </div>
      <Menu
        anchorEl={priorityAnchorEl[props.todo._id]}
        keepMounted
        open={Boolean(priorityAnchorEl[props.todo._id])}
        onClose={() => {
          handlePriorityMenuClose(props.todo._id);
        }}
        elevation={1}
      >
        <MenuItem onClick={() => handlePriorityItemClick(props.todo._id, 3)}>
          High
        </MenuItem>
        <MenuItem onClick={() => handlePriorityItemClick(props.todo._id, 2)}>
          Medium
        </MenuItem>
        <MenuItem onClick={() => handlePriorityItemClick(props.todo._id, 1)}>
          Low
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default PriorityMenuItem