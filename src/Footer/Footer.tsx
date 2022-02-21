import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import DFOLinkList from '../components/DFOLinkList/DFOLinkList';
import theme from '../theme';

const useStyles = makeStyles({
  footerContainer: {
    width: '100%',
    height: 300,
    backgroundColor: theme.palette.blue.main,
    [theme.breakpoints.down('md')]: {
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

  const list = [
    { title: 'Kontakt', href: '/' },
    { title: 'English', href: '/' },
    { title: 'Personvern', href: '/' },
    { title: 'Offentlig postjournal', href: '/' }
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
        <DFOLinkList list={list} iconType="arrow" />
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
