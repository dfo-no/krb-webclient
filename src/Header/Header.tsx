import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@mui/material/Container';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
  Link as RouterLink,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import Link from '@mui/material/Link';
import { CssBaseline } from '@mui/material';

import { useTranslation } from 'react-i18next';

import theme from '../theme';

const useStyles = makeStyles({
  logoBig: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  logoSmall: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

export default function Header(): React.ReactElement {
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

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            marginBottom: 70
          }}
        >
          <AppBar elevation={0}>
            <Toolbar>
              <Grid container wrap="nowrap">
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <Link
                        className={classes.logoBig}
                        component={RouterLink}
                        to="/"
                      >
                        <img src="/logo-blue.svg" alt="DFØ logo" />
                      </Link>
                      <Link
                        className={classes.logoSmall}
                        component={RouterLink}
                        to="/"
                      >
                        <img src="/logo-blue-small.svg" alt="DFØ logo" />
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
