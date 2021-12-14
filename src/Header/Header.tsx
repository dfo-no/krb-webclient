import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import { CssBaseline } from '@material-ui/core';
import Container from '@mui/material/Container';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import theme from '../theme';

export default function Header(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ flexGrow: 1, marginBottom: 70 }}>
          <AppBar elevation={0}>
            <Toolbar>
              <Link component={RouterLink} to="/" sx={{ flexGrow: 1 }}>
                <img src="/logo-blue.svg" alt="DFØ logo" />
              </Link>
              <Button variant="contained">Logg inn</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
