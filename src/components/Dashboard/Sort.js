import React, { useState, Fragment } from 'react';

//Material Components
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
	button: {
		marginRight: 8
	}
}));

const Sort = (props) => {

	const classes = useStyles();

	const [sortAnchorEl, setSortAnchorEl] = useState(null);

	const handleSortClick = (event) => {
		setSortAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setSortAnchorEl(null);
	};

	const handleMenuItemclick = (sortType) => {
		handleMenuClose();
		props.setSortType(sortType);		
		props.clearFilters();
	};

	return (
		<Fragment>
			<Button
				className={classes.button}
				variant="outlined"
				size="small"
				startIcon={<SortIcon />}
				onClick={handleSortClick}
			>Sort</Button>
			<Menu
				id="sort-todo"
				anchorEl={sortAnchorEl}
				open={Boolean(sortAnchorEl)}
				onClose={handleMenuClose}
				elevation={1}
			>
				<MenuItem onClick={() => { handleMenuItemclick("priority"); }} >Priority</MenuItem>
				<MenuItem onClick={() => { handleMenuItemclick("dueDate"); }} > Due date </MenuItem>
				<MenuItem onClick={() => { handleMenuItemclick("status"); }} > Status </MenuItem>
			</Menu>
		  </Fragment>
	)
}

export default Sort;
