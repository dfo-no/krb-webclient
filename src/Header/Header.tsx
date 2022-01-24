import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import { Box, Typography } from '@mui/material/';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import theme from '../theme';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerText: {
    display: 'flex',
    gap: 3,
    flexDirection: 'column',
    marginLeft: 60,
    paddingTop: 10
  },
  headerProjectData: {
    display: 'flex',
    alignContent: 'baseline',
    backgroundColor: 'red'
  },
  projectPublishedStatus: {
    backgroundColor: theme.palette.gray200.main,
    color: theme.palette.black.main
  },
  headerLogo: {
    alignSelf: 'center'
  }
});

export default function Header(): React.ReactElement {
  const classes = useStyles();

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Box className={classes.header}>
          <Box>
            <Box className={classes.headerText}>
              <Typography variant="headerText">
                Anskaffelser.no / Kravbank / IT-konsulenter
              </Typography>
              <Box className={classes.headerProjectData}>
                <Typography variant="headerProjectText">
                  IT-konsulenter
                </Typography>
                <Box>
                  <Typography variant="headerText">
                    VERSJON 12. OKT 2021
                  </Typography>
                  <Box className={classes.projectPublishedStatus}>
                    Ikke publisert
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.headerLogo}>
            <img
              src="/logo-blue.svg"
              alt="DFØ logo header big"
              width="263.06"
              height="38"
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
