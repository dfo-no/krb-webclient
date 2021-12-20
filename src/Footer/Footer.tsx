import * as React from 'react';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from '../theme';

const useStyles = makeStyles({
  footerContainer: {
    backgroundColor: theme.palette.blue.main,
    height: '50vh',
    marginTop: '90px',
    paddingLeft: '100px'
  },
  footerLinksItem: {
    borderBottom: `1px solid ${theme.palette.lightBlue.main}`,
    paddingBottom: '10px',
    paddingTop: '10px',
    paddingRight: '8px'
  }
});

export default function Footer(): React.ReactElement {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        component="div"
        className={classes.footerContainer}
        justifyContent="center"
        alignItems="center"
        columnSpacing={8}
      >
        <Grid container xs={4}>
          <Grid container item className={classes.footerLinksItem}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="footer">Kontakt</Typography>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
          <Grid container item className={classes.footerLinksItem}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="footer">English</Typography>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
          <Grid container item className={classes.footerLinksItem}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="footer">Personvern</Typography>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
          <Grid
            container
            item
            className={classes.footerLinksItem}
            wrap="nowrap"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="footer">Offentlig postjournal</Typography>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
        </Grid>

        <Grid item container xs={4} direction="column" spacing={2}>
          <Grid item>
            <img src="/logo-white.svg" alt="DFØ logo footer" />
          </Grid>
          <Grid item>
            <Grid item>
              <Typography variant="footer">Karl Johans gate 37B</Typography>
            </Grid>
            <Grid item>
              <Typography variant="footer">
                Pb 7154 St. Olavs plass, 0130 Oslo
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="footer">Tlf: 400 07 997</Typography>
            </Grid>
            <Grid item>
              <Typography variant="footer">Org. nr. 986 252 932</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
