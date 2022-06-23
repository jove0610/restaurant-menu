import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { addOptionItem } from '../../../../firebase/options';

function NoOptionsForm({ menuName }) {
  const [errMessage, setErrMessage] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');

  const onChange = (e) => {
    if (e.target.name === 'cost') {
      setCost(e.target.value);
    }
    if (e.target.name === 'price') {
      setPrice(e.target.value);
    }
    if (e.target.name === 'stock') {
      setStock(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addOptionItem({ menuName, cost, price, stock });
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="1em" alignItems="center">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing="1em">
          <TextField
            type="number"
            name="price"
            value={price}
            label="Price"
            onChange={onChange}
            size="small"
            required
          />

          <TextField
            type="number"
            name="cost"
            value={cost}
            label="Cost"
            onChange={onChange}
            size="small"
            required
          />

          <TextField
            type="number"
            name="stock"
            value={stock}
            label="Stock"
            onChange={onChange}
            size="small"
            required
          />
        </Stack>

        <Button type="submit" variant="outlined">
          Add Option
        </Button>

        <Typography color="red" textAlign="center">
          {errMessage}
          &nbsp;
        </Typography>
      </Stack>
    </form>
  );
}

NoOptionsForm.propTypes = {
  menuName: PropTypes.string.isRequired,
};

export default NoOptionsForm;
