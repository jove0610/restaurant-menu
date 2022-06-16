import React from 'react';
import { HashRouter } from 'react-router-dom';

import AppRoutes from './Routes';
import Drawer from './components/Drawer';

function App() {
  return (
    <HashRouter>
      <Drawer>
        <AppRoutes />
      </Drawer>
    </HashRouter>
  );
}

export default App;
