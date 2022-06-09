import AppBar from '@mui/material/AppBar';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem, {
  listItemClasses,
  ListItemProps
} from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import css from './Footer.module.scss';
import logoWhite from '../assets/images/logo-white.svg';
import theme from '../theme';

const StyledListItem = styled(ListItem)<ListItemProps>(({ theme: t }) => {
  return {
    '&.MuiListItem-root': {
      '&.MuiListItem-divider': {
        borderBottom: `0.1rem solid ${t.palette.white.main}`
      }
    }
  };
});

const Footer = () => {
  const links = [
    { title: 'Kontakt', href: '/' },
    { title: 'English', href: '/' },
    { title: 'Personvern', href: '/' },
    { title: 'Offentlig postjournal', href: '/' }
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container className={css.Footer}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 4
            }}
          >
            <List
              dense
              sx={{
                width: '100%',
                maxWidth: 460,
                height: '90%',
                [`& .${listItemClasses.root}:hover`]: {
                  color: theme.palette.lightBlue.main,
                  fontWeight: 'bold',
                  '& svg': {
                    fill: theme.palette.lightBlue.main
                  }
                }
              }}
            >
              <Divider
                component="li"
                sx={{
                  borderTop: `0.1rem solid ${theme.palette.white.main}`
                }}
              />
              {links.map((link) => (
                <StyledListItem
                  divider={true}
                  alignItems="flex-start"
                  key={link.title}
                >
                  <ListItemButton component={Link} href={link.href}>
                    <ListItemText primary={link.title} />
                    <ListItemIcon className={css.icon}>
                      <ArrowForwardIos />
                    </ListItemIcon>
                  </ListItemButton>
                </StyledListItem>
              ))}
            </List>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pl: 8,
              pt: 2,
              pb: 2
            }}
          >
            <CardMedia
              component="img"
              image={logoWhite}
              sx={{ width: 137, height: 38 }}
            />
            <Typography>Karl Johans gate 37B</Typography>
            <Typography>Pb 7154 St. Olavs plass, 0130 Oslo</Typography>
            <Typography>Tlf: 400 07 997</Typography>
            <Typography>Org. nr. 986 252 932</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
