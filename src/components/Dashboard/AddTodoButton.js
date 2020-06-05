import React from 'react';

//Material Components
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
	button: {
		marginRight: 8
	}
}));

const AddTodoButton = (props) => {

	const classes = useStyles();

	return (
		<Button
            align="end"
			variant="outlined"
			className={classes.button}
			onClick={() => { props.setisOpenDlg(true); }}
			size="small"
			color="primary"
			startIcon={<AddIcon />}>Add Todo</Button>
	)
}

export default AddTodoButton;
