import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useCategories } from '../../firebase/categories';
import { useMenu } from '../../firebase/menu';
import useTitle from '../../hooks/useTitle';
import AddMenu from './components/AddMenu';
import MenuItems from './components/MenuItems';
import MenuItemOptions from './components/MenuItemOptions';

function Menu() {
  useTitle('Menu');
  const categories = useCategories();
  const menu = useMenu();
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuItemOptions, setOpenMenuItemOptions] = useState(false);
  // name of menu to be used in MenuItemOptions
  const [optionsMenuName, setOptionsMenuName] = useState('');

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <Box
      sx={{
        boxShadow: '0 0 0.7em #777',
        borderRadius: '1em',
        padding: '1em',
        width: '35em',
        maxWidth: '90vw',
        mx: 'auto',
      }}
    >
      {!openMenu && (
        <>
          <Stack alignItems="flex-end">
            <Button variant="outlined" onClick={() => setOpenMenu(true)}>
              Add Menu
            </Button>
          </Stack>

          <MenuItems
            menu={menu}
            categories={categories}
            setOptionsMenuName={setOptionsMenuName}
            setOpenOptions={setOpenMenuItemOptions}
          />
        </>
      )}

      {openMenu && (
        <AddMenu
          categories={categories}
          menu={menu}
          handleClose={handleCloseMenu}
        />
      )}

      {openMenuItemOptions && (
        <MenuItemOptions
          setOpen={setOpenMenuItemOptions}
          menuName={optionsMenuName}
        />
      )}
    </Box>
  );
}

export default Menu;
