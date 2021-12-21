import * as React from 'react';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import theme from '../theme';

const useStyles = makeStyles({
  footerContainer: {
    backgroundColor: theme.palette.blue.main,
    height: '50vh',
    marginTop: '90px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '24px',
      height: '70vh'
    }
  },
  footerLink: {
    borderBottom: `1px solid ${theme.palette.lightBlue.main}`,
    paddingBottom: '12px',
    paddingTop: '12px',
    paddingRight: '8px',
    paddingLeft: '20px',
    minWidth: '230px',
    '&:hover': {
      '& $footerLinkText': {
        color: theme.palette.lightBlue.main
      }
    }
  },
  footerLinkText: {},
  logoFooter: {
    maxWidth: '100%',
    height: 'auto'
  }
});

const footerLinks = [
  'Kontakt',
  'English',
  'Personvern',
  'Offentlig postjournal'
];

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
      >
        <Grid item sm={4}>
          {footerLinks.map((value) => {
            return (
              <Link component={RouterLink} to="/">
                <Grid container item className={classes.footerLink}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      className={classes.footerLinkText}
                      variant="footer"
                    >
                      {value}
                    </Typography>
                  </Box>
                  <Box>
                    <img src="/arrow.svg" alt="DFØ footer link arrow" />
                  </Box>
                </Grid>
              </Link>
            );
          })}
        </Grid>

        <Grid item sm={4} direction="column" spacing={3}>
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
