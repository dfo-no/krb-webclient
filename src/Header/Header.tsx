import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default function Header(): React.ReactElement {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item>
            <img alt="DFØ Logo" src="/logo-blue.svg" />
          </Grid>
          <Grid item>
            <Button variant="contained">Login</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
