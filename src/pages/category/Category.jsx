import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { addCategory } from '../../firebase/categories';
import useTitle from '../../hooks/useTitle';
import CategoryItems from './components/CategoryItems';

function Category() {
  useTitle('Category');
  const [name, setName] = useState('');

  const onSubmitAdd = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    addCategory({ name });
    setName('');
  };

  return (
    <Box
      sx={{
        boxShadow: '0 0 0.7em #777',
        borderRadius: '1em',
        padding: '1em',
        width: '35em',
        maxWidth: '90vw',
        mx: 'auto',
      }}
    >
      <Divider>
        <Typography variant="body2">Add Category</Typography>
      </Divider>

      <form onSubmit={onSubmitAdd}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing="2em"
          mt="1em"
          mb="2em"
        >
          <TextField
            value={name}
            label="Name"
            onChange={(e) => setName(e.target.value)}
            size="small"
            sx={{ flexGrow: 1 }}
            required
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
          >
            Add Category
          </Button>
        </Stack>
      </form>

      <CategoryItems />
    </Box>
  );
}

export default Category;
