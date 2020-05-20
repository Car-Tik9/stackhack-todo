import React, {Fragment} from 'react';

//Material Components
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';

function InitialCard() {
	return (
		<Fragment>
			<Paper variant="outlined">
				<Typography component="h4" variant="h4" align="center">
					Create Your first Task
				</Typography>
				<IconButton aria-label="add" size="small">
					<Icon style={{ fontSize: 30 }}>add_circle</Icon>
				</IconButton>
			</Paper>
		</Fragment>
	)
}

export default InitialCard;