import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { grey } from '@mui/material/colors';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import HelpIcon from '@mui/icons-material/Help';

import { addMenu } from '../../../../firebase/menu';
import HasOptions from './HasOptions';
import NoOptions from './NoOptions';

function AddMenu({ categories, setOpen }) {
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState(null);

  // options toggle switch
  const [options, setOptions] = useState('');

  // data to be used if No Options is selected
  const [noOptions, setNoOptions] = useState({
    name: null,
    price: '',
    cost: '',
    stock: '',
  });

  // data to be used if Has Options is selected
  const [hasOptions, setHasOptions] = useState([]);

  const categoriesOptions = useMemo(() => {
    const output = Object.keys(categories).map((key) => key);
    return output;
  }, [categories]);

  const onSubmitAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrMessage('Name is empty.');
      setHasError(true);
      return;
    }

    let menuOptions = [];
    if (options) {
      if (hasOptions.length === 0) {
        setErrMessage('Must have at least 1 option.');
        setHasError(true);
        return;
      }
      menuOptions = hasOptions;
    }
    if (!options) {
      const { name: optionName, price, cost, stock } = noOptions;
      menuOptions = [
        {
          name: optionName,
          price: Number(price),
          cost: Number(cost),
          stock: Number(stock),
        },
      ];
    }

    try {
      await addMenu(name, category, menuOptions);
      setOpen(false);
    } catch (err) {
      setHasError(true);
      setErrMessage(err.message);
    }
  };

  return (
    <Dialog open onClose={() => setOpen(false)} scroll="paper">
      <DialogTitle>Add Menu</DialogTitle>

      <DialogContent dividers sx={{ width: '30em', maxWidth: '90vw' }}>
        <form onSubmit={onSubmitAdd}>
          <Stack spacing="1.5em">
            <TextField
              value={name}
              label="Name"
              onChange={(e) => setName(e.target.value)}
              size="small"
              required
            />

            <Autocomplete
              value={category}
              options={categoriesOptions}
              onChange={(_, value) => setCategory(value)}
              sx={{ width: 300 }}
              size="small"
              renderInput={(params) => (
                <TextField required {...params} label="Category" /> // eslint-disable-line
              )}
            />

            <Stack direction="row" alignItems="center">
              <Switch
                value={options}
                onChange={(_, value) => setOptions(value)}
              />
              <Typography mr="0.5em">Options</Typography>

              <Tooltip
                arrow
                title="Allows this item to have options (i.e. small, medium, large)"
              >
                <HelpIcon sx={{ color: grey[600] }} />
              </Tooltip>
            </Stack>

            {!options && <NoOptions data={noOptions} setData={setNoOptions} />}
            {options && (
              <HasOptions data={hasOptions} setData={setHasOptions} />
            )}
          </Stack>
        </form>

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
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Back
        </Button>

        <Button variant="contained" type="submit">
          Add Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddMenu.propTypes = {
  categories: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddMenu;
