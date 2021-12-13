import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { CssBaseline } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Container from '@mui/material/Container';

import { ThemeProvider } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import {
  useHistory,
  useRouteMatch,
  Link as RouterLink
} from 'react-router-dom';

import Link from '@mui/material/Link';

import SignedButton from '../SignedButton/SignedButton';

import theme from '../theme';

export default function Header(): React.ReactElement {
  const badgeText = 'dev';

  const history = useHistory();
  const { t } = useTranslation();
  const home = (): void => {
    history.push('/');
  };

  const match = useRouteMatch({
    path: '/workbench/:projectId',
    strict: false,
    sensitive: true
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Box
            sx={{
              marginBottom: 70
            }}
          >
            <AppBar elevation={0}>
              <Toolbar>
                <Grid container wrap="nowrap" spacing={5}>
                  <Grid item>
                    <Grid container wrap="nowrap" spacing={4}>
                      <Grid item>
                        <Link component={RouterLink} to="/home">
                          <img src="/logo-blue.svg" alt="DFØ logo" />
                        </Link>
                      </Grid>
                      <Grid item>
                        <Badge badgeContent={badgeText} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item justifyContent="flex-end">
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
