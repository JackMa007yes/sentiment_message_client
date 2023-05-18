import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import AppRoutes from './routes';
import globalTheme from './utils/globalTheme';
import { Suspense } from 'react';
import Progress from './components/ui/Progress';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={globalTheme}>
          <SnackbarProvider maxSnack={3}>
            <Suspense fallback={<Progress />}>
              <AppRoutes />
            </Suspense>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
