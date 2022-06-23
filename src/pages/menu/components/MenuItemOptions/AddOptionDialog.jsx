import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { addOptionItem } from '../../../../firebase/options';

function AddOptionDialog({ menuName, setOpen, hasNoOptions }) {
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');

  const onClickAdd = async (e) => {
    e.preventDefault();

    try {
      await addOptionItem({
        menuName,
        optionName: name || undefined,
        price,
        cost,
        stock,
      });

      setOpen(false);
    } catch (err) {
      setHasError(true);
      setErrMessage(err.message);
    }
  };

  return (
    <Dialog open onClose={() => setOpen(false)} scroll="paper">
      <form onSubmit={onClickAdd}>
        <DialogTitle>Add Option</DialogTitle>

        <DialogContent dividers>
          <Stack spacing="1em">
            {!hasNoOptions && (
              <TextField
                value={name}
                label="Name"
                onChange={(e) => setName(e.target.value)}
                size="small"
                required
              />
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing="1em">
              <TextField
                type="number"
                value={price}
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
                size="small"
                required
              />

              <TextField
                type="number"
                value={cost}
                label="Cost"
                onChange={(e) => setCost(e.target.value)}
                size="small"
                required
              />

              <TextField
                type="number"
                value={stock}
                label="Stock"
                onChange={(e) => setStock(e.target.value)}
                size="small"
                required
              />
            </Stack>

            {hasError && (
              <Typography textAlign="center" color="red">
                {errMessage}
              </Typography>
            )}
            {!hasError && (
              <Typography textAlign="center" color="red">
                &nbsp;
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Add Option
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddOptionDialog.propTypes = {
  menuName: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  hasNoOptions: PropTypes.bool.isRequired,
};

export default AddOptionDialog;
