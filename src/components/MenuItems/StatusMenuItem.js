import React, { Fragment, useState } from "react";
import { MenuItem, Menu } from "@material-ui/core";
import { getStatusButton } from "../../utils/todoUtils";
function StatusMenuItem(props) {
  const [anchorEl, setAnchorEl] = useState([]);
  const handleStatusButtonClick = (event, id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleMenuClose = (id) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };

  const handleMenuItemClick = (id, status) => {
    handleMenuClose(id);
    props.handleStatusChange(id, status);
  };

  return (
    <Fragment>
      <div onClick={(event) => handleStatusButtonClick(event, props.todo._id)}>
        {getStatusButton(props.todo.status)}
      </div>
      <Menu
        anchorEl={anchorEl[props.todo._id]}
        keepMounted
        open={Boolean(anchorEl[props.todo._id])}
        onClose={() => handleMenuClose(props.todo._id)}
        elevation={1}
      >
        <MenuItem onClick={(event) => handleMenuItemClick(props.todo._id, 1)}>
          New
        </MenuItem>
        <MenuItem onClick={(event) => handleMenuItemClick(props.todo._id, 2)}>
          In Progress
        </MenuItem>
        <MenuItem onClick={(event) => handleMenuItemClick(props.todo._id, 3)}>
          Completed
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default StatusMenuItem;
