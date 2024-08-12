import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/defaultTheme';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Routes';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Box
                            bg={'primary.100'}
                            textColor={'neutral.white'}
                            h={'100vh'}
                            w={'100vw'}
                        >
                            <Router />
                        </Box>
                    </Provider>
                </QueryClientProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
