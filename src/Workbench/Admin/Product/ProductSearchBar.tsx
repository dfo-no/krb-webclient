import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material/';
import React from 'react';

import theme from '../../../theme';
import { DFOTextField } from '../../../components/DFOTextField/DFOTextField';

const useStyles = makeStyles({});

export default function Header(): React.ReactElement {
  const classes = useStyles();
  return (
    <Box>
      <DFOTextField label="Søk etter produkt" />
    </Box>
  );
}
