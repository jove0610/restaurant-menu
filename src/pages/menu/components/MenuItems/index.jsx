import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { yellow, red } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/More';

import { editMenu, deleteMenu } from '../../../../firebase/menu';
import DeleteDialog from '../../../../components/DeleteDialog';
import EditDialog from './EditDialog';

function MenuItems({ menu, categories, setOpenOptions, setOptionsMenuName }) {
  const [dialogItemName, setDialogItemName] = useState('');
  const [menuItemEditDialog, setMenuItemEditDialog] = useState({
    name: '',
    category: '',
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const onClickDeleteIcon = (menuName) => {
    setDialogItemName(menuName);
    setOpenDeleteDialog(true);
  };

  const onClickEditIcon = (menuItem) => {
    setMenuItemEditDialog(menuItem);
    setOpenEditDialog(true);
  };

  const onClickMoreIcon = (menuName) => {
    setOptionsMenuName(menuName);
    setOpenOptions(true);
  };

  const onEdit = (oldData, newData) => {
    if (newData.name in menu) {
      throw new Error('Name already exist.');
    }

    editMenu(oldData, newData);
  };

  const onDelete = (menuName) => {
    deleteMenu(menu[menuName]);
  };

  return (
    <>
      <Divider>
        <Typography variant="body2">Items</Typography>
      </Divider>

      <Stack>
        {Object.keys(menu).map((key) => {
          const { name: menuName, category: menuCategory } = menu[key];

          return (
            <Fragment key={key}>
              <Stack
                py="0.7em"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack alignItems="flex-start">
                  <Typography variant="h6">{menuName}</Typography>
                  {menuCategory && (
                    <Chip label={menuCategory} color="secondary" size="small" />
                  )}
                </Stack>

                <Stack direction="row">
                  <Tooltip title="More" arrow>
                    <IconButton
                      onClick={() => onClickMoreIcon(menuName)}
                      sx={{ color: '#333' }}
                    >
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit" arrow>
                    <IconButton
                      onClick={() => onClickEditIcon(menu[key])}
                      sx={{ color: yellow[800] }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" arrow>
                    <IconButton
                      onClick={() => onClickDeleteIcon(menuName)}
                      sx={{ color: red[700] }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>

              <Divider />
            </Fragment>
          );
        })}
      </Stack>

      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        itemName={dialogItemName}
        onDelete={onDelete}
      />

      <EditDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onEdit={onEdit}
        menuItem={menuItemEditDialog}
        categories={categories}
      />
    </>
  );
}

MenuItems.propTypes = {
  categories: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  menu: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  setOptionsMenuName: PropTypes.func.isRequired,
  setOpenOptions: PropTypes.func.isRequired,
};

export default MenuItems;
