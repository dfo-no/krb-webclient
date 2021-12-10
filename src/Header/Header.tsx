import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { CssBaseline } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Container from '@mui/material/Container';

import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../theme';

export default function Header(): React.ReactElement {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Box
            sx={{
              marginBottom: 70
            }}
          >
            <AppBar>
              <CssBaseline />
              <Toolbar>
                <Grid container wrap="nowrap" justifyContent="space-between">
                  <Grid item>
                    <img alt="DFØ Logo" src="/logo-blue.svg" />
                  </Grid>
                  <Grid item>
                    <Button>Login</Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
