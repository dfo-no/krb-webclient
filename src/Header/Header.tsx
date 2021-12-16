import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import {
  Link as RouterLink,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import Link from '@mui/material/Link';

import SignedButton from '../SignedButton/SignedButton';

import theme from '../theme';

const useStyles = makeStyles({
  logoBig: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  logoSmall: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      padding: 10
    }
  },
  hideSignedButton: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  showSignedButton: {
    display: 'block'
  }
});

export default function Header(): React.ReactElement {
  const history = useHistory();
  const { t } = useTranslation();

  const match = useRouteMatch({
    path: '/workbench/:projectId',
    strict: false,
    sensitive: true
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          marginBottom: 8
        }}
      >
        <AppBar elevation={0}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link className={classes.logoBig} component={RouterLink} to="/">
                <img src="/logo-blue.svg" alt="DFØ logo" />
              </Link>
              <Link className={classes.logoSmall} component={RouterLink} to="/">
                <img src="/logo-blue-small.svg" alt="DFØ logo" />
              </Link>
            </Box>

            {match && (
              <Box mx={1}>
                <Button
                  variant="ordinary"
                  onClick={() => {
                    history.push('/workbench');
                  }}
                >
                  {t('all projects')}
                </Button>
              </Box>
            )}

            <Box
              className={`${
                match ? classes.hideSignedButton : classes.showSignedButton
              }`}
            >
              <SignedButton />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
