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

import { editOptionItem } from '../../../../firebase/options';

function EditOptionDialog({ menuName, setOpen, option }) {
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [name, setName] = useState(option.name);
  const [price, setPrice] = useState(option.price);
  const [cost, setCost] = useState(option.cost);
  const [stock, setStock] = useState(option.stock);

  const onClickAdd = async (e) => {
    e.preventDefault();

    try {
      const newOption = {
        name,
        price: Number(price),
        cost: Number(cost),
        stock: Number(stock),
      };
      await editOptionItem(menuName, option, newOption);
      setOpen(false);
    } catch (err) {
      setHasError(true);
      setErrMessage(err.message);
    }
  };

  return (
    <Dialog open onClose={() => setOpen(false)} scroll="paper">
      <form onSubmit={onClickAdd}>
        <DialogTitle>Edit Option</DialogTitle>

        <DialogContent dividers>
          <Stack spacing="1em">
            <TextField
              value={name}
              label="Name"
              onChange={(e) => setName(e.target.value)}
              size="small"
              required
            />

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
            Edit Option
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

EditOptionDialog.propTypes = {
  menuName: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  option: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditOptionDialog;
