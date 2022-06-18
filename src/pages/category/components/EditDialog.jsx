import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

function EditDialog({ open, setOpen, categoryName, onEdit }) {
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setNewCategoryName(categoryName);
  }, [categoryName]);

  const handleClose = () => {
    setOpen(false);
    setErrMessage('');
    setNewCategoryName(categoryName);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      return;
    }

    try {
      onEdit(categoryName, newCategoryName);
      handleClose();
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmitEdit}>
        <DialogTitle>Edit {categoryName}?</DialogTitle>

        <Divider />

        <DialogContent>
          <DialogContentText>
            Enter the new name of this category.
          </DialogContentText>

          <TextField
            value={newCategoryName}
            label="New Category Name"
            onChange={(e) => setNewCategoryName(e.target.value)}
            size="small"
            sx={{ mt: '1em' }}
            required
          />

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
  categoryName: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditDialog;
