import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material/';
import React from 'react';
import theme from '../../../theme';

const useStyles = makeStyles({});

export default function Header(): React.ReactElement {
  const classes = useStyles();
  console.log('KEK');
  return <Box>Hei</Box>;
}
