import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';

import theme from '../../theme';

const useStyles = makeStyles({
  header: {
    width: '100%',
    maxWidth: '250rem',
    height: '100%',
    padding: 'var(--small-gap) var(--big-gap)',
    color: theme.palette.black.main
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  img: {
    height: '2.625rem'
  },
  viewingProjectTitle: {
    display: 'flex',
    paddingBottom: 3,
    width: '100%',
    [theme.breakpoints.down('mddd')]: {
      paddingBottom: 0
    }
  },
  notViewingProjectTitle: {
    paddingBottom: 3
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
      gap: 0
    }
  }
});

export default function Header(): React.ReactElement {
  const classes = useStyles();

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.white.main,
        borderBottom: `0.2rem solid ${theme.palette.gray300.main}`
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
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
