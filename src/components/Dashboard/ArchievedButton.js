import React from 'react';

//Material Components
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

//Utilities
import history from "./../../utils/history";

//Component Styles
const useStyles = makeStyles(() => ({
	button: {
		marginRight: 8
	}
}));

const ArchievedButton = () => {

	const classes = useStyles();

	return (
		<Button
			onClick={() => {history.push('/view-archieved')}}
			variant="outlined"
			size="small"
			className={classes.button}
		>View Archieved</Button>
	)
}

export default ArchievedButton;
