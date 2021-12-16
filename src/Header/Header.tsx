import * as React from 'react';

import {
  Link as RouterLink,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CssBaseline } from '@mui/material';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import theme from '../theme';
import SignedButton from '../SignedButton/SignedButton';

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
                  variant="regularMuiButton"
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
