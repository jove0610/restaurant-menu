import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function NoOptions({ data, setData }) {
  const onChange = (e) => {
    if (e.target.name === 'cost') {
      setData({ ...data, cost: e.target.value });
    }
    if (e.target.name === 'price') {
      setData({ ...data, price: e.target.value });
    }
    if (e.target.name === 'stock') {
      setData({ ...data, stock: e.target.value });
    }
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing="1em">
      <TextField
        type="number"
        name="price"
        value={data.price}
        label="Price"
        onChange={onChange}
        size="small"
        required
      />

      <TextField
        type="number"
        name="cost"
        value={data.cost}
        label="Cost"
        onChange={onChange}
        size="small"
        required
      />

      <TextField
        type="number"
        name="stock"
        value={data.stock}
        label="Stock"
        onChange={onChange}
        size="small"
        required
      />
    </Stack>
  );
}

NoOptions.propTypes = {
  data: PropTypes.shape({
    cost: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stock: PropTypes.string.isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default NoOptions;
