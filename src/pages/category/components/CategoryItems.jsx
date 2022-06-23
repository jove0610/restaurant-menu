import React, { useState } from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useCategories, deleteCategory } from '../../../firebase/categories';
import DeleteDialog from '../../../components/DeleteDialog';
import EditDialog from './EditDialog';
import TableCategory from './TableCategory';

function CategoryItems() {
  const categories = useCategories();
  const [errMessage, setErrMessage] = useState('');
  const [dialogItemName, setDialogItemName] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleCloseDelDialog = () => {
    setErrMessage('');
    setOpenDeleteDialog(false);
  };

  const onClickDeleteIcon = (categoryName) => {
    setDialogItemName(categoryName);
    setOpenDeleteDialog(true);
  };

  const onClickEditIcon = (categoryName) => {
    setDialogItemName(categoryName);
    setOpenEditDialog(true);
  };

  const onDelete = async (categoryName) => {
    try {
      await deleteCategory(categories[categoryName]);
      handleCloseDelDialog();
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  return (
    <>
      <Divider>
        <Typography variant="body2">Items</Typography>
      </Divider>

      <TableCategory
        categories={categories}
        onClickEditIcon={onClickEditIcon}
        onClickDeleteIcon={onClickDeleteIcon}
      />

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDelDialog}
        itemName={dialogItemName}
        onDelete={onDelete}
        errMessage={errMessage}
      />

      <EditDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        categoryName={dialogItemName}
      />
    </>
  );
}

export default CategoryItems;
