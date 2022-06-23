import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { deleteMenu } from '../../../../firebase/menu';
import DeleteDialog from '../../../../components/DeleteDialog';
import EditDialog from './EditDialog';
import TableMenu from './TableMenu';

function MenuItems({ menu, categories, setOpenOptions, setOptionsMenuName }) {
  const [dialogItemName, setDialogItemName] = useState('');
  const [menuItemEditDialog, setMenuItemEditDialog] = useState({
    name: '',
    category: '',
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleCloseDelDialog = () => {
    setOpenDeleteDialog(false);
  };

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

  const onDelete = (menuName) => {
    deleteMenu(menu[menuName]);
    handleCloseDelDialog();
  };

  return (
    <>
      <Divider>
        <Typography variant="body2">Items</Typography>
      </Divider>

      <TableMenu
        menu={menu}
        onClickEditIcon={onClickEditIcon}
        onClickDeleteIcon={onClickDeleteIcon}
        onClickMoreIcon={onClickMoreIcon}
      />

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDelDialog}
        itemName={dialogItemName}
        onDelete={onDelete}
      />

      <EditDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
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
