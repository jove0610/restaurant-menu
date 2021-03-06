import React from 'react';
import Typography from '@mui/material/Typography';

import useTitle from '../hooks/useTitle';

function Error404() {
  useTitle('');

  return (
    <Typography variant="h3" textAlign="center">
      404: Not Found
    </Typography>
  );
}

export default Error404;
