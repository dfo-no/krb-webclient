import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import { CssBaseline } from '@material-ui/core';
import Container from '@mui/material/Container';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Grid from '@material-ui/core/Grid';

import { Link as RouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';

import theme from '../theme';

export default function Header(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            marginBottom: 70
          }}
        >
          <AppBar variant="outlined" elevation={0}>
            <Toolbar>
              <Grid container wrap="nowrap" spacing={5}>
                <Grid item>
                  <Grid container wrap="nowrap" spacing={4}>
                    <Grid item>
                      <Link component={RouterLink} to="/">
                        <img src="/logo-blue.svg" alt="DFØ logo" />
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item justifyContent="flex-end">
                  <Button variant="contained">Logg inn</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
