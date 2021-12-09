import React from 'react';

import {
  ThemeProvider,
  createStyles,
  makeStyles
} from '@material-ui/core/styles';

import AppBar from '@mui/material/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@mui/material/Container';

import theme from '../theme';

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      marginBottom: theme.spacing(36)
    },
    appBar: {
      backgroundColor: theme?.palette?.dfoBlue?.main
    }
  })
);

export default function Header(): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container className={classes.headerContainer} maxWidth="md">
          <AppBar>
            <Toolbar>
              <Grid container wrap="nowrap" justifyContent="space-between">
                <Grid item>
                  <img alt="DFØ Logo" src="/logo-blue.svg" />
                </Grid>
                <Grid item>
                  <Button variant="contained">Login</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Container>
      </ThemeProvider>
    </>
  );
}
