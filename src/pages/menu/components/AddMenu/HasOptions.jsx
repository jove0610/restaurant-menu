import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';

function HasOptions({ data, setData }) {
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');

  const onClickAdd = () => {
    if (!name || !price || !cost || !stock) {
      setErrMessage('Please fill all fields.');
      setHasError(true);
      return;
    }

    const index = data.findIndex((datum) => datum.name === name);
    if (index !== -1) {
      setErrMessage('Name already exist.');
      setHasError(true);
      return;
    }

    setData([
      ...data,
      {
        name,
        price: Number(price),
        cost: Number(cost),
        stock: Number(stock),
      },
    ]);
    setName('');
    setPrice('');
    setCost('');
    setStock('');
    setErrMessage('');
    setHasError(false);
  };

  const onClickDeleteIcon = (optionName) => {
    const newData = data.filter((option) => option.name !== optionName);
    setData(newData);
  };

  return (
    <>
      {data.map((option) => (
        <Stack
          key={option.name}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>{option.name}</Typography>
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

          <Tooltip title="Delete" arrow>
            <IconButton
              onClick={() => onClickDeleteIcon(option.name)}
              sx={{ color: red[700] }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}

      <Stack spacing="1em">
        <TextField
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
          size="small"
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing="1em">
          <TextField
            type="number"
            value={price}
            label="Price"
            onChange={(e) => setPrice(e.target.value)}
            size="small"
          />

          <TextField
            type="number"
            value={cost}
            label="Cost"
            onChange={(e) => setCost(e.target.value)}
            size="small"
          />

          <TextField
            type="number"
            value={stock}
            label="Stock"
            onChange={(e) => setStock(e.target.value)}
            size="small"
          />
        </Stack>

        <Button onClick={onClickAdd} variant="contained">
          Add Option
        </Button>

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
    </>
  );
}

HasOptions.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      cost: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
    })
  ).isRequired,
  setData: PropTypes.func.isRequired,
};

export default HasOptions;
