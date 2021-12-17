import * as React from 'react';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
      <Grid container component="div" className={classes.footerContainer}>
        <Grid item xs={8}>
          <Typography variant="footerTypography">Kontakt</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>English</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>Personvern</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>Offentlig postjournal</Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
