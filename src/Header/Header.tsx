import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link as RouterLink,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
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

  console.log(theme);

  return (
    <Box
      sx={{
        marginBottom: 11
      }}
    >
      <AppBar elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link className={classes.logoBig} component={RouterLink} to="/">
              <img
                src="/logo-blue.svg"
                alt="DFØ logo header big"
                width="263.06"
                height="38"
              />
            </Link>
            <Link className={classes.logoSmall} component={RouterLink} to="/">
              <img
                src="/logo-blue-small.svg"
                alt="DFØ logo header small"
                width="61.408165"
                height="30.729862"
              />
            </Link>
          </Box>

          {match && (
            <Box mx={1}>
              <Button
                variant="primary"
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
  );
}
