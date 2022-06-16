import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import SideMenu from './SideMenu';
import TopMenu from './TopMenu';

const drawerWidth = '15em';

function ResponsiveDrawer({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopMenu
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      <SideMenu
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth})` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  children: PropTypes.node,
};

ResponsiveDrawer.defaultProps = {
  children: null,
};

export default ResponsiveDrawer;
