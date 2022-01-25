import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import { Box, Typography } from '@mui/material/';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import theme from '../theme';
import { useAppSelector } from '../store/hooks';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    gap: 3,
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: '5%',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('header')]: {
      paddingBottom: 0
    }
  },
  projectPath: {
    marginLeft: 3,
    [theme.breakpoints.down('header')]: {
      marginLeft: 1
    }
  },
  projectData: {
    display: 'flex',
    flexDirection: 'row',
    gap: 18,

    [theme.breakpoints.down('header')]: {
      flexDirection: 'column',
      gap: 3
    }
  },
  projectStatus: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    paddingTop: 6,

    [theme.breakpoints.down('header')]: {
      paddingTop: 0,
      paddingBottom: 8
    }
  },
  projectPublished: {
    backgroundColor: '#C4C4C4',
    color: theme.palette.black.main,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default function Header(): React.ReactElement {
  const classes = useStyles();

  const displayTitle = useAppSelector((state) => state.project.project).title;

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Box className={classes.header}>
          <Box className={classes.projectPath}>
            <Typography variant="small">
              Anskaffelser.no / Kravbank / IT-konsulenter
            </Typography>
          </Box>
          <Box className={classes.projectData}>
            <Typography variant="big">{displayTitle}</Typography>
            <Box className={classes.projectStatus}>
              <Typography variant="small">VERSJON 12. OKT 2021</Typography>
              <Box className={classes.projectPublished}>
                {' '}
                <Button>Hei</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
