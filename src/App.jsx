import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';

import AppRoutes from './Routes';
import Drawer from './components/Drawer';

import initFirebase from './firebase/init';
import store from './redux/store';
import theme from './styles/theme';

initFirebase();

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />

          <Drawer>
            <AppRoutes />
          </Drawer>
        </Provider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
