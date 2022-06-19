import React, { useState } from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useCategories, deleteCategory } from '../../../firebase/categories';
import DeleteDialog from '../../../components/DeleteDialog';
import EditDialog from './EditDialog';
import TableCategory from './TableCategory';

function CategoryItems() {
  const categories = useCategories();
  const [dialogItemName, setDialogItemName] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const onClickDeleteIcon = (categoryName) => {
    setDialogItemName(categoryName);
    setOpenDeleteDialog(true);
  };

  const onClickEditIcon = (categoryName) => {
    setDialogItemName(categoryName);
    setOpenEditDialog(true);
  };

  const onDelete = (categoryName) => {
    deleteCategory(categories[categoryName]);
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
        setOpen={setOpenDeleteDialog}
        itemName={dialogItemName}
        onDelete={onDelete}
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
