import { createTheme } from '@mui/material';

const globalTheme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  palette: {
    mode: 'dark',
    primary: {
      light: '#9c27b0',
      main: '#9c27b0',
      dark: '#9c27b0',
      contrastText: '#fff'
    }
  }
});

export default globalTheme;
