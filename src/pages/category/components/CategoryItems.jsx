import React, { Fragment, useState } from 'react';

import { yellow, red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useCategories, deleteCategory } from '../../../firebase/categories';
import DeleteDialog from '../../../components/DeleteDialog';
import EditDialog from './EditDialog';

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

      <Stack>
        {Object.keys(categories).map((key) => {
          const { name: categoryName } = categories[key];

          return (
            <Fragment key={key}>
              <Stack
                py="0.7em"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">{categoryName}</Typography>

                <Stack direction="row">
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      onClick={() => onClickEditIcon(categoryName)}
                      sx={{ color: yellow[800] }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" arrow>
                    <IconButton
                      onClick={() => onClickDeleteIcon(categoryName)}
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
        categoryName={dialogItemName}
      />
    </>
  );
}

export default CategoryItems;
