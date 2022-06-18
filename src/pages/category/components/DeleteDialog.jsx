import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

import { deleteCategory } from '../../../firebase/categories';

function DeleteDialog({ open, setOpen, category }) {
  const onClickDelete = () => {
    setOpen(false);
    deleteCategory(category);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Delete {category.name}?</DialogTitle>

      <Divider />

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onClickDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteDialog;
