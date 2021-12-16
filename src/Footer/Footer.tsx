import * as React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme';

const useStyles = makeStyles({
  footerContainer: {
    backgroundColor: theme.palette.blue.main
  }
});

export default function Footer(): React.ReactElement {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container className={classes.footerContainer}>
        <Grid item xs={8}>
          Kontakt
        </Grid>
        <Grid item xs={8}>
          English
        </Grid>
        <Grid item xs={8}>
          Personvern
        </Grid>
        <Grid item xs={8}>
          Offentlig postjournal
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
