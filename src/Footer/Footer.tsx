import * as React from 'react';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

import ArrowForward from '@mui/icons-material/ArrowForward';
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
  logoFooter: {
    maxWidth: '100%',
    height: 'auto'
  },
  linkListItem: {
    borderBottom: `1px solid ${theme.palette.lightBlue.main}`,
    color: `${theme.palette.white.main}`
  },
  linkList: {
    width: '100%'
  },
  test: {
    maxHeight: '200px'
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
        <Grid item sm={4} className={classes.linkList}>
          <List component="nav" aria-label="link list">
            {footerLinks.map((link) => {
              return (
                <Box component="div" className={classes.linkListItem}>
                  <ListItem button>
                    <ListItemText primary={link} />
                    <ArrowForward />
                  </ListItem>
                </Box>
              );
            })}
          </List>
        </Grid>

        <Grid container item sm={4} direction="column" spacing={4}>
          <Grid item>
            <img
              className={classes.logoFooter}
              src="/logo-white.svg"
              alt="DFØ logo footer"
            />
          </Grid>
          <Grid item className={classes.test}>
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
