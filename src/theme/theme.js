import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		"fontFamily": `'Ubuntu', sans-serif`,
		"fontSize": 14,
		"fontWeightLight": 300,
		"fontWeightRegular": 400,
		"fontWeightMedium": 500,
		"fontWeightBold": 700,
		useNextVariants: true,
		h1:{
			fontWeight: 'bold',
			fontSize: '40px',
		},
		h2:{
			fontWeight: 'Medium',
			fontSize: '32px',
		},
		h3:{
			fontWeight : 'Medium',
			fontSize: '28px',
		},
		h4:{
			fontWeight : 'Regular',
			fontSize: '24px',
		},
		h5:{
			fontWeight : 'Regular',
			fontSize: '18px',
		},
		h6:{
			fontWeight : 'Light',
			fontSize: '15px',
		},
		body1:{
			fontSize: '15px',
			color: 'rgba(0, 0, 0, 0.96)',
		},
		body2:{
			fontSize: '15px',
			color: 'rgba(0, 0, 0, 0.96)'
		},
		subtitle1:{
			fontWeight: 'Medium',
			fontSize: '15px',
			color: 'rgba(0, 0, 0, 0.96)',
		}
	},
	palette: {
		primary: {
			light: '#6200EE',
			main: '#6200EE',
			dark: '#6200EE',
			contrastText: '#FFF',
		},
		secondary: {
			light: '#018786',
			main: '#009688',
			dark: '#018786',
			contrastText: '#FFF',
		},
		link: {
			light: 'rgba(0, 0, 0, 0.96)',
			main: 'rgba(0, 0, 0, 0.96)',
			dark: 'rgba(0, 0, 0, 0.96)',
			contrastText: '#FFF',
		},
		background: {
			default: '#F4F4F4',
			paper: '#FFF'
		},
	}
});

export default theme;

// #bd8e0c