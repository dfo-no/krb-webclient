import * as React from 'react';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import {
  Link as RouterLink,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import theme from '../theme';

const useStyles = makeStyles({
  footerContainer: {
    backgroundColor: theme.palette.blue.main,
    height: '50vh',
    marginTop: '90px'
  },
  footerLink: {
    borderBottom: `1px solid ${theme.palette.lightBlue.main}`,
    paddingBottom: '10px',
    paddingTop: '10px',
    paddingRight: '8px',
    minWidth: '185px',
    '&:hover': {
      backgroundColor: '#0a4678'
    },
    paddingLeft: '10px'
  },
  logoFooter: {
    maxWidth: '100%',
    height: 'auto'
  }
});

export default function Footer(): React.ReactElement {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        className={classes.footerContainer}
        justifyContent="center"
        alignItems="center"
        columnSpacing={8}
        direction="row"
      >
        <Grid container xs={4}>
          <Grid container item className={classes.footerLink}>
            <Box sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to="/">
                <Typography variant="footer">Kontakt</Typography>
              </Link>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
          <Grid container item className={classes.footerLink}>
            <Box sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to="/">
                <Typography variant="footer">English</Typography>
              </Link>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
          <Grid container item className={classes.footerLink}>
            <Box sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to="/">
                <Typography variant="footer">Personvern</Typography>
              </Link>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
          <Grid container item className={classes.footerLink}>
            <Box sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to="/">
                <Typography variant="footer">Offentlig postjournal</Typography>
              </Link>
            </Box>
            <Box>
              <img src="/arrow.svg" alt="DFØ footer link arrow" />
            </Box>
          </Grid>
        </Grid>

        <Grid item container xs={4} direction="column" spacing={2}>
          <Grid item>
            <img
              className={classes.logoFooter}
              src="/logo-white.svg"
              alt="DFØ logo footer"
            />
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
