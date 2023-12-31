import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';

import 'sanitize.css/sanitize.css';

import GlobalStyle from './global-styles';
import store, { history } from './store/index.ts';
import App from './App.tsx';
import theme from './theme.ts';
import AppBarMenu from './containers/Menu/AppBar.tsx';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalStyle />
          <AppBarMenu>
            <App />
          </AppBarMenu>
        </StyledEngineProvider>
      </ThemeProvider>
    </HistoryRouter>
  </Provider>,
  MOUNT_NODE,
);
