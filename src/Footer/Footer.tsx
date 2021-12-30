import { makeStyles } from '@material-ui/core';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import theme from '../theme';

const useStyles = makeStyles({
  footerContainer: {
    marginTop: 110,
    height: 300,
    backgroundColor: theme.palette.blue.main,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 24,
      height: 480
    }
  },
  footerLinkList: {
    '&>:nth-child(1)': {
      borderTop: `1px solid ${theme.palette.dfoLightBlue.main}`
    }
  },
  footerLinkListItem: {
    borderBottom: `1px solid ${theme.palette.dfoLightBlue.main}`,
    '&:hover': {
      '& $footerLinkText': {
        color: theme.palette.dfoLightBlue.main
      },
      '& $footerLinkArrow': {
        color: theme.palette.dfoLightBlue.main
      }
    }
  },
  footerLinkText: {},
  footerLinkArrow: {
    color: theme.palette.dfoWhite.main
  }
});

export default function Footer(): React.ReactElement {
  const classes = useStyles();

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

  return (
    <Grid
      container
      className={classes.footerContainer}
      justifyContent="center"
      alignItems="center"
      direction="row"
      columnSpacing={12}
    >
      <Grid item xs={12} sm={5}>
        <List
          className={classes.footerLinkList}
          component="nav"
          aria-label="footerlist"
        >
          {footerLinks.map((link) => {
            return (
              <ListItem
                component={Link}
                href="/"
                className={classes.footerLinkListItem}
                key={link}
              >
                <ListItemText>
                  <Typography
                    className={classes.footerLinkText}
                    variant="footerLinkText"
                  >
                    {link}
                  </Typography>
                </ListItemText>
                <ArrowForwardIos className={classes.footerLinkArrow} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid container item xs={12} sm={4} direction="column" spacing={3}>
        <Grid item>
          <Link href="https://www.dfo.no">
            <img
              src="/logo-white.svg"
              alt="DFØ logo footer"
              width="137"
              height="38"
            />
          </Link>
        </Grid>
        <Grid item>
          {footerAddressTexts.map((text) => {
            return (
              <Grid item key={text}>
                <Typography variant="footerAddressText">{text}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
