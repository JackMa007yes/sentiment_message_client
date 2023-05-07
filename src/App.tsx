import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // default: true
    }
  }
});

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },

  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#9c27b0',
      dark: '#002884',
      contrastText: '#fff'
    }
  }
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <AppRoutes />
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
