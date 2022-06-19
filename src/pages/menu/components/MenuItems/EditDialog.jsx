import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { red } from '@mui/material/colors';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

/* ----------------------------------------------------------------------------
 | The word "menu" is both singular and plural.The "menu" variable used in 
 | this component refers to the singular menu, kinda like menuItem.
 | ----------------------------------------------------------------------------
 */
function EditDialog({ open, setOpen, menuItem: menu, onEdit, categories }) {
  const [newMenuName, setNewMenuName] = useState(menu.name);
  const [newCategory, setNewCategory] = useState(menu.category || null);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setNewMenuName(menu.name);
    setNewCategory(menu.category || null);
  }, [menu]);

  const categoriesOptions = useMemo(() => {
    const output = Object.keys(categories).map((key) => key);
    return output;
  }, [categories]);

  const handleClose = () => {
    setOpen(false);
    setErrMessage('');
    setNewMenuName(menu.name);
    setNewCategory(menu.category);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();

    if (!newMenuName.trim()) {
      return;
    }

    const newMenu = {
      name: newMenuName,
      category: newCategory,
    };

    try {
      onEdit(menu, newMenu);
      handleClose();
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmitEdit}>
        <DialogTitle>Edit {menu.name}?</DialogTitle>

        <Divider />

        <DialogContent>
          {/* <DialogContentText>
            Enter the new name of this category.
          </DialogContentText> */}

          <Stack spacing="1.5em">
            <TextField
              value={newMenuName}
              label="New Menu Name"
              onChange={(e) => setNewMenuName(e.target.value)}
              size="small"
              required
            />

            <Autocomplete
              value={newCategory}
              options={categoriesOptions}
              onChange={(_, value) => setNewCategory(value)}
              sx={{ width: 300 }}
              size="small"
              renderInput={(params) => (
                <TextField required {...params} label="New Category Name" /> // eslint-disable-line
              )}
            />
          </Stack>
          {errMessage && (
            <DialogContentText color={red[800]}>{errMessage}</DialogContentText>
          )}
          {!errMessage && <DialogContentText>&nbsp;</DialogContentText>}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  categories: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EditDialog;
