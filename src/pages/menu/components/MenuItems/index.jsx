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

import { deleteMenu } from '../../../../firebase/menu';
import DeleteDialog from '../../../../components/DeleteDialog';

function MenuItems({ menu }) {
  const [dialogItemName, setDialogItemName] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onClickDeleteIcon = (categoryName) => {
    setDialogItemName(categoryName);
    setOpenDeleteDialog(true);
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
                    <IconButton sx={{ color: '#333' }}>
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit" arrow>
                    <IconButton sx={{ color: yellow[800] }}>
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
    </>
  );
}

MenuItems.propTypes = {
  menu: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
};

export default MenuItems;
