import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import { getTitle } from '../../redux/appSlice';

function TopMenu({ drawerWidth, handleDrawerToggle }) {
  const title = useSelector(getTitle);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth})` },
        ml: { md: `${drawerWidth}` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

TopMenu.propTypes = {
  drawerWidth: PropTypes.string.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default TopMenu;
