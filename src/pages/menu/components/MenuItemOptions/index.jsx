import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { red, yellow } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  useOptionsByName,
  deleteOptionItem,
} from '../../../../firebase/options';
import AddOptionDialog from './AddOptionDialog';
import DeleteDialog from '../../../../components/DeleteDialog';
import EditOptionDialog from './EditOptionDialog';
import NoOptionsForm from './NoOptionsForm';

function MenuItemOptions({ setOpen, menuName }) {
  const options = useOptionsByName(menuName);
  const [dialogItemName, setDialogItemName] = useState('');
  const [openAddOption, setOpenAddOption] = useState(false);
  const [openEditOption, setOpenEditOption] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [optionToBeEdited, setOptionToBeEdited] = useState({
    name: '',
    price: 0,
    cost: 0,
    stock: 0,
  });

  const getOptionName = (name) => {
    if (name !== '_defaultOptionName') {
      return name;
    }

    const optionsLen = Object.keys(options).length;
    if (name === '_defaultOptionName' && optionsLen > 1) {
      return 'Default';
    }

    return null;
  };

  const handleCloseDelDialog = () => {
    setOpenDeleteDialog(false);
  };

  const onClickEditIcon = (option) => {
    setOptionToBeEdited(option);
    setOpenEditOption(true);
  };

  const onClickDeleteIcon = (itemName) => {
    const newItemName = itemName === '_defaultOptionName' ? '' : itemName;
    setDialogItemName(newItemName);
    setOpenDeleteDialog(true);
  };

  const onDelete = (itemName) => {
    deleteOptionItem(menuName, itemName);
    handleCloseDelDialog();
  };

  return (
    <>
      <Dialog open onClose={() => setOpen(false)} scroll="paper">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          pr="1.5em"
        >
          <DialogTitle> Options</DialogTitle>
          <Button variant="outlined" onClick={() => setOpenAddOption(true)}>
            Add Option
          </Button>
        </Stack>

        <DialogContent dividers sx={{ width: '30em', maxWidth: '90vw' }}>
          <Stack spacing="1.5em">
            {Object.keys(options).map((key) => {
              const option = options[key];

              return (
                <Stack
                  key={option.name}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography fontWeight="bold">
                      {getOptionName(option.name)}
                    </Typography>

                    <Box>
                      <Chip
                        label={`Price: ${option.price.toLocaleString()}`}
                        color="secondary"
                        sx={{ mr: '0.5em', mt: '0.3em' }}
                      />
                      <Chip
                        label={`Cost: ${option.cost.toLocaleString()}`}
                        color="secondary"
                        sx={{ mr: '0.5em', mt: '0.3em' }}
                      />
                      <Chip
                        label={`Stock: ${option.stock.toLocaleString()}`}
                        color="secondary"
                        sx={{ mr: '0.5em', mt: '0.3em' }}
                      />
                    </Box>
                  </Stack>

                  <Stack direction="row">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        onClick={() => onClickEditIcon(option)}
                        sx={{ color: yellow[800] }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete" arrow>
                      <IconButton
                        onClick={() => onClickDeleteIcon(option.name)}
                        sx={{ color: red[700] }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              );
            })}

            {Object.keys(options).length === 0 && (
              <NoOptionsForm menuName={menuName} />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Back
          </Button>
        </DialogActions>
      </Dialog>

      {openAddOption && (
        <AddOptionDialog menuName={menuName} setOpen={setOpenAddOption} />
      )}

      {openEditOption && (
        <EditOptionDialog
          menuName={menuName}
          setOpen={setOpenEditOption}
          option={optionToBeEdited}
        />
      )}

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDelDialog}
        itemName={dialogItemName}
        onDelete={onDelete}
      />
    </>
  );
}

MenuItemOptions.propTypes = {
  setOpen: PropTypes.func.isRequired,
  menuName: PropTypes.string.isRequired,
};

export default MenuItemOptions;
