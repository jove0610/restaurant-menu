import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AppRoutes from './Routes';
import Drawer from './components/Drawer';

import initFirebase from './firebase/init';
import theme from './styles/theme';

initFirebase();

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Drawer>
          <AppRoutes />
        </Drawer>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
