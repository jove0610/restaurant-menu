import React from 'react';
import PropTypes from 'prop-types';

import { red, yellow } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useOptionsByName } from '../../../../firebase/options';

function MenuItemOptions({ setOpen, menuName }) {
  const options = useOptionsByName(menuName);

  const getOptionName = (name) => {
    if (name !== '_defaultOptionName') {
      return name;
    }

    const optionsLen = Object.keys(options).length;
    if (name === '_defaultOptionName' && optionsLen > 1) {
      return 'Default';
    }

    return null;
  };

  return (
    <Dialog open onClose={() => setOpen(false)} scroll="paper">
      <DialogTitle> Options</DialogTitle>

      <DialogContent dividers sx={{ width: '30em', maxWidth: '90vw' }}>
        <Stack spacing="1.5em">
          {Object.keys(options).map((key) => {
            const option = options[key];

            return (
              <Stack
                key={option.name}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography fontWeight="bold">
                    {getOptionName(option.name)}
                  </Typography>

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

                <Stack direction="row">
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      // onClick={() => onClickEditIcon(categoryName)}
                      sx={{ color: yellow[800] }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" arrow>
                    <IconButton
                      // onClick={() => onClickDeleteIcon(categoryName)}
                      sx={{ color: red[700] }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MenuItemOptions.propTypes = {
  setOpen: PropTypes.func.isRequired,
  menuName: PropTypes.string.isRequired,
};

export default MenuItemOptions;
