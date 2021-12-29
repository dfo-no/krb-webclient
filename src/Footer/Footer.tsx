import * as React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import theme from '../theme';

const useStyles = makeStyles({
  footerContainer: {
    backgroundColor: theme.palette.blue.main,
    height: '300px',
    marginTop: '100px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '24px',
      height: '480px'
    }
  },
  footerLinkList: {
    '&>:nth-child(1)': {
      borderTop: `1px solid ${theme.palette.lightBlue.main}`
    }
  },
  footerLinkListItem: {
    borderBottom: `1px solid ${theme.palette.lightBlue.main}`,
    color: `${theme.palette.white.main}`
  }
});

const footerLinks = [
  'Kontakt',
  'English',
  'Personvern',
  'Offentlig postjournal'
];

const footerAddressTexts = [
  'Karl Johans gate 37B',
  'Pb 7154 St. Olavs plass, 0130 Oslo',
  'Tlf: 400 07 997',
  'Org. nr. 986 252 932'
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
        direction="row"
        columnSpacing={12}
      >
        +++++++++
        <Grid item xs={12} sm={5}>
          <List
            className={classes.footerLinkList}
            component="nav"
            aria-label="footer link list"
          >
            {footerLinks.map((link) => {
              return (
                <Link component={RouterLink} to="/">
                  <ListItem className={classes.footerLinkListItem}>
                    <ListItemText>
                      <Typography variant="footerLinkText">{link}</Typography>
                    </ListItemText>
                    <ArrowForward />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Grid>
        <Grid container item xs={12} sm={4} direction="column" spacing={3}>
          <Grid item>
            <img
              src="/logo-white.svg"
              alt="DFØ logo footer"
              width="137"
              height="38"
            />
          </Grid>
          <Grid item>
            {footerAddressTexts.map((text) => {
              return (
                <Grid item>
                  <Typography variant="footerAddressText">{text}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
