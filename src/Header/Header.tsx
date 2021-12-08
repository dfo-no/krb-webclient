import React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@mui/material/Container';

import {
  ThemeProvider,
  createTheme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles';

const theme = createTheme({
  spacing: [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
    42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78,
    80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100
  ],
  palette: {
    primary: {
      main: '#eb345b'
    },
    secondary: {
      main: '#ffffff'
    }
  }
});

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      marginBottom: theme.spacing(36)
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
              <Grid container justifyContent="space-between">
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
