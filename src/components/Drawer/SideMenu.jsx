import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';

import companyLogo from '../../assets/images/company-logo.png';

function DrawerItems() {
  const { pathname } = useLocation();

  const items = [
    { name: 'Menu', Icon: MenuBookIcon, url: '/menu' },
    { name: 'Category', Icon: NoteOutlinedIcon, url: '/category' },
  ];

  return (
    <>
      <Box component="img" src={companyLogo} width="80%" m="1em auto" />
      <Divider />
      <List>
        {items.map((item) => {
          const { name, Icon, url } = item;

          return (
            <Link key={name} to={url} component={RouterLink} underline="none">
              <ListItem
                disablePadding
                sx={{ background: url === pathname && blue[100] }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Icon
                      sx={{ color: url === pathname ? blue[700] : '#444' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                      fontWeight: 'bold',
                      color: url === pathname ? blue[700] : '#444',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </>
  );
}

function SideMenu({ drawerWidth, mobileOpen, handleDrawerToggle }) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <DrawerItems />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawerItems />
      </Drawer>
    </Box>
  );
}

SideMenu.propTypes = {
  drawerWidth: PropTypes.string.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default SideMenu;
