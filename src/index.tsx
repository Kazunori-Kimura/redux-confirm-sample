import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createStore from './stores';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const store = createStore();

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    overflowX: 'hidden',
                },
            },
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
