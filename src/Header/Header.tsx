import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { CssBaseline } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Container from '@mui/material/Container';

import { ThemeProvider } from '@material-ui/core/styles';
import SignedButton from '../SignedButton/SignedButton';

import theme from '../theme';

export default function Header(): React.ReactElement {
  const badgeText = 'DEV';

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Box
            sx={{
              marginBottom: 70
            }}
          >
            <AppBar elevation={0}>
              <CssBaseline />
              <Toolbar>
                <Grid container wrap="nowrap">
                  <Grid container item>
                    <img alt="DFØ Logo" src="/logo-blue.svg" />
                  </Grid>
                  <Grid item xs={9}>
                    <Badge badgeContent={badgeText} color="primary" />
                  </Grid>
                  <Grid container item justify="flex-end">
                    <SignedButton />
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
