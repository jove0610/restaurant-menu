import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function DeleteDialog({ open, handleClose, itemName, onDelete, errMessage }) {
  const onClickDelete = () => {
    onDelete(itemName);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete {itemName}?</DialogTitle>

      <Divider />

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>

      <Typography color="red" textAlign="center">
        {errMessage}
        &nbsp;
      </Typography>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
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
  handleClose: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  errMessage: PropTypes.string,
};

DeleteDialog.defaultProps = {
  errMessage: '',
};

export default DeleteDialog;
