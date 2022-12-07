import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import { Button } from '@mui/material';
import { t } from 'i18next';
import { useOidc } from '@axa-fr/react-oidc';

import theme from '../../theme';

const useStyles = makeStyles({
  header: {
    width: '100%',
    height: '100%',
    padding: 'var(--small-gap) var(--big-gap)',
    color: theme.palette.black.main,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
  },
  img: {
    height: '2.625rem',
  },
  viewingProjectTitle: {
    display: 'flex',
    paddingBottom: 3,
    flexGrow: 1,
    [theme.breakpoints.down('mddd')]: {
      paddingBottom: 0,
    },
  },
  projectData: {
    display: 'flex',
    flexGrow: 1,
    gap: 20,
    alignItems: 'center',

    [theme.breakpoints.down('mddd')]: {
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 0,
    },
  },
  loginLogout: {
    display: 'flex',
  },
});

export default function Header(): React.ReactElement {
  const classes = useStyles();
  const { login, logout, isAuthenticated } = useOidc();

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.white.main,
        borderBottom: `0.2rem solid ${theme.palette.gray300.main}`,
      }}
    >
      <Box className={classes.header}>
        <Box>
          <Box className={classes.headerContent}>
            <Box className={classes.viewingProjectTitle}>
              <Box className={classes.projectData}>
                <img className={classes.img} src={'/logo-header.svg'} />
              </Box>
            </Box>
            <Box className={classes.loginLogout}>
              {!isAuthenticated && (
                <Button variant="primary" onClick={() => login()}>
                  {t('Sign in')}
                </Button>
              )}
              {isAuthenticated && (
                <Button variant="warning" onClick={() => logout()}>
                  {t('Sign out')}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
