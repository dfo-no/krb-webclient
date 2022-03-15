import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export default function LoaderSpinner(): React.ReactElement {
  return (
    <Box
      sx={{
        minHeight: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}
