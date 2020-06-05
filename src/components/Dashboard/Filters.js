import React, { Fragment, useState } from 'react';

//Material Components
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";

const Filters = (props) => {

	const [filtersAnchorEl, setFiltersAnchorEl] = useState(null);

	const handleFilterCllck = (event) => {
		setFiltersAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setFiltersAnchorEl(null);
	};

	return (
		<Fragment>
			<Button
				variant={props.isFiltered ? "contained" : "outlined"}
				size="small"
				startIcon={<FilterListIcon />}
				onClick={handleFilterCllck}
			>Filters</Button>
			<Menu
				id="filter-todo"
				anchorEl={filtersAnchorEl}
				open={Boolean(filtersAnchorEl)}
				onClose={handleMenuClose}
				elevation={1}
			>
				<MenuItem disabled={true}>Priority</MenuItem>
				<MenuItem onClick={() => { props.filterMethod("priority", 3); }} > High </MenuItem>
				<MenuItem onClick={() => { props.filterMethod("priority", 2); }} > Medium </MenuItem>
				<MenuItem onClick={() => { props.filterMethod("priority", 1); }} > Low </MenuItem>
				<MenuItem disabled={true}>Status</MenuItem>
				<MenuItem onClick={() => { props.filterMethod("status", 1); }} > New </MenuItem>
				<MenuItem onClick={() => { props.filterMethod("status", 2); }} > In-progress </MenuItem>
				<MenuItem onClick={() => { props.clearFilters(); }} > Clear Filters </MenuItem>
			</Menu>
		</Fragment>
	)
}

export default Filters;
